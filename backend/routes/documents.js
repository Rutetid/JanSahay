import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Predefined document types
const DOCUMENT_TYPES = [
  'aadhar_card',
  'pan_card',
  'income_certificate',
  'caste_certificate',
  'domicile_certificate',
  'bank_passbook',
  'ration_card',
  'disability_certificate'
];

/**
 * GET /api/documents/:userId
 * Get all documents for a user
 */
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only access your own documents' 
      });
    }

    const { data: documents, error } = await supabaseAdmin
      .from('user_documents')
      .select('*')
      .eq('user_id', userId)
      .order('document_type');

    if (error) {
      console.error('Documents fetch error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to fetch documents' 
      });
    }

    // If no documents exist, initialize with all document types
    if (!documents || documents.length === 0) {
      const initialDocs = DOCUMENT_TYPES.map(type => ({
        user_id: userId,
        document_type: type,
        has_document: false,
        verification_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { data: created, error: createError } = await supabaseAdmin
        .from('user_documents')
        .insert(initialDocs)
        .select();

      if (createError) {
        console.error('Initialize documents error:', createError);
        return res.status(500).json({ 
          error: 'Database error',
          message: 'Failed to initialize documents' 
        });
      }

      return res.json({ documents: created });
    }

    res.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get documents' 
    });
  }
});

/**
 * PUT /api/documents/:userId/:documentId
 * Update a document status
 */
router.put('/:userId/:documentId', authenticate, async (req, res) => {
  try {
    const { userId, documentId } = req.params;
    const { hasDocument } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only update your own documents' 
      });
    }

    if (typeof hasDocument !== 'boolean') {
      return res.status(400).json({ 
        error: 'Invalid data',
        message: 'hasDocument must be a boolean value' 
      });
    }

    const { data, error } = await supabaseAdmin
      .from('user_documents')
      .update({
        has_document: hasDocument,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Update document error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to update document' 
      });
    }

    if (!data) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Document not found' 
      });
    }

    res.json({
      message: 'Document updated successfully',
      document: data
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update document' 
    });
  }
});

/**
 * POST /api/documents/:userId/upload
 * Upload a document file to Supabase Storage
 */
router.post('/:userId/upload', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const { documentType, fileName, fileData } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only upload documents to your own profile' 
      });
    }

    if (!documentType || !fileName || !fileData) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'documentType, fileName, and fileData are required' 
      });
    }

    if (!DOCUMENT_TYPES.includes(documentType)) {
      return res.status(400).json({ 
        error: 'Invalid document type',
        message: `Document type must be one of: ${DOCUMENT_TYPES.join(', ')}` 
      });
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(fileData, 'base64');
    const filePath = `${userId}/${documentType}/${Date.now()}_${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        contentType: 'application/pdf', // Adjust based on file type
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({ 
        error: 'Upload failed',
        message: uploadError.message 
      });
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin
      .storage
      .from('documents')
      .getPublicUrl(filePath);

    // Update document record with file URL
    const { data: docData, error: docError } = await supabaseAdmin
      .from('user_documents')
      .update({
        has_document: true,
        uploaded_file: urlData.publicUrl,
        verification_status: 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('document_type', documentType)
      .select()
      .single();

    if (docError) {
      console.error('Document record update error:', docError);
      // File uploaded but record update failed
      return res.status(500).json({ 
        error: 'Database error',
        message: 'File uploaded but failed to update record' 
      });
    }

    res.json({
      message: 'Document uploaded successfully',
      document: docData,
      fileUrl: urlData.publicUrl
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to upload document' 
    });
  }
});

/**
 * DELETE /api/documents/:userId/:documentId/file
 * Delete a document file from storage
 */
router.delete('/:userId/:documentId/file', authenticate, async (req, res) => {
  try {
    const { userId, documentId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only delete your own documents' 
      });
    }

    // Get document to find file path
    const { data: document, error: fetchError } = await supabaseAdmin
      .from('user_documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (fetchError || !document) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Document not found' 
      });
    }

    if (!document.uploaded_file) {
      return res.status(400).json({ 
        error: 'No file',
        message: 'No file associated with this document' 
      });
    }

    // Extract file path from URL
    const urlParts = document.uploaded_file.split('/documents/');
    if (urlParts.length !== 2) {
      return res.status(500).json({ 
        error: 'Invalid file URL',
        message: 'Could not parse file path' 
      });
    }
    const filePath = urlParts[1];

    // Delete from storage
    const { error: deleteError } = await supabaseAdmin
      .storage
      .from('documents')
      .remove([filePath]);

    if (deleteError) {
      console.error('Storage delete error:', deleteError);
      return res.status(500).json({ 
        error: 'Delete failed',
        message: deleteError.message 
      });
    }

    // Update document record
    const { data, error: updateError } = await supabaseAdmin
      .from('user_documents')
      .update({
        uploaded_file: null,
        verification_status: 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Document update error:', updateError);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'File deleted but failed to update record' 
      });
    }

    res.json({
      message: 'Document file deleted successfully',
      document: data
    });
  } catch (error) {
    console.error('Delete document file error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to delete document file' 
    });
  }
});

export default router;
