import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import ragClient from '../config/rag.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/schemes/discover
 * Discover schemes based on user profile using RAG service
 */
router.post('/discover', optionalAuth, async (req, res) => {
  try {
    const {
      gender,
      age,
      state,
      residence,
      category,
      income,
      occupation
    } = req.body;

    // Validate required fields
    if (!age || !state || !residence || !category || !income || !occupation) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'All profile fields are required for scheme discovery' 
      });
    }

    // Map frontend data to RAG UserProfile format
    const userProfile = {
      age: parseInt(age),
      gender: gender || 'male',
      income: parseFloat(income) * 100000, // Convert lakhs to rupees
      state: state,
      occupation: occupation,
      caste: category, // RAG uses 'caste' field
      residency: residence // RAG uses 'residency' field
    };

    // Call RAG service to find matching schemes
    const ragResponse = await ragClient.post('/find-schemes', userProfile);

    if (!ragResponse.data) {
      return res.status(500).json({ 
        error: 'RAG service error',
        message: 'Failed to get schemes from RAG service' 
      });
    }

    // Get scheme IDs from RAG response and fetch detailed info from database
    const schemeTexts = ragResponse.data.results.map(r => r.scheme_text);
    
    // For now, return RAG results directly
    // TODO: Map RAG results to database schemes for complete information
    const schemes = ragResponse.data.results.map((result, index) => ({
      id: index + 1,
      schemeText: result.scheme_text,
      relevanceScore: result.relevance_score,
      // Parse scheme name from the text (first line usually contains the name)
      name: result.scheme_text.split('\n')[0].trim(),
    }));

    // If user is authenticated, optionally save the search
    if (req.user) {
      // TODO: Save search history to database
      console.log(`User ${req.user.id} discovered ${schemes.length} schemes`);
    }

    res.json({
      message: 'Schemes discovered successfully',
      totalSchemes: ragResponse.data.total_schemes,
      schemes: schemes,
      query: ragResponse.data.query
    });
  } catch (error) {
    console.error('Discover schemes error:', error);
    
    if (error.response) {
      // RAG service returned an error
      return res.status(error.response.status || 500).json({ 
        error: 'RAG service error',
        message: error.response.data?.detail || 'Failed to discover schemes' 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to discover schemes' 
    });
  }
});

/**
 * GET /api/schemes/:schemeId
 * Get detailed information about a specific scheme
 */
router.get('/:schemeId', async (req, res) => {
  try {
    const { schemeId } = req.params;

    const { data: scheme, error } = await supabaseAdmin
      .from('schemes')
      .select('*')
      .eq('id', schemeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ 
          error: 'Not found',
          message: 'Scheme not found' 
        });
      }
      
      console.error('Scheme fetch error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to fetch scheme' 
      });
    }

    // Transform database format to frontend format
    const schemeData = {
      id: scheme.id,
      name: scheme.name,
      nameHi: scheme.name_hi,
      category: scheme.category,
      categoryHi: scheme.category_hi,
      benefit: scheme.benefit,
      benefitHi: scheme.benefit_hi,
      deadline: scheme.deadline,
      deadlineHi: scheme.deadline_hi,
      description: scheme.description,
      descriptionHi: scheme.description_hi,
      eligibility: scheme.eligibility,
      eligibilityHi: scheme.eligibility_hi,
      benefits: scheme.benefits,
      benefitsHi: scheme.benefits_hi,
      documents: scheme.documents,
      documentsHi: scheme.documents_hi,
      applicationProcess: scheme.application_process,
      applicationProcessHi: scheme.application_process_hi,
      officialWebsite: scheme.official_website,
      ministry: scheme.ministry,
      ministryHi: scheme.ministry_hi
    };

    res.json({ scheme: schemeData });
  } catch (error) {
    console.error('Get scheme error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get scheme details' 
    });
  }
});

/**
 * GET /api/schemes
 * Get all schemes with optional filtering
 */
router.get('/', async (req, res) => {
  try {
    const { category, ministry, limit = 50, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('schemes')
      .select('id, name, name_hi, category, category_hi, benefit, benefit_hi, deadline, ministry')
      .range(offset, offset + limit - 1)
      .order('name');

    if (category) {
      query = query.eq('category', category);
    }

    if (ministry) {
      query = query.eq('ministry', ministry);
    }

    const { data: schemes, error, count } = await query;

    if (error) {
      console.error('Schemes fetch error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to fetch schemes' 
      });
    }

    res.json({
      schemes: schemes,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get schemes error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get schemes' 
    });
  }
});

/**
 * POST /api/schemes
 * Create a new scheme (admin only)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    // TODO: Add admin role check
    const schemeData = req.body;

    const { data, error } = await supabaseAdmin
      .from('schemes')
      .insert([
        {
          ...schemeData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Create scheme error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to create scheme' 
      });
    }

    res.status(201).json({
      message: 'Scheme created successfully',
      scheme: data
    });
  } catch (error) {
    console.error('Create scheme error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to create scheme' 
    });
  }
});

export default router;
