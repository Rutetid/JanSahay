import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/users/:userId/profile
 * Get user profile
 */
router.get('/:userId/profile', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user can only access their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only access your own profile' 
      });
    }

    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Profile fetch error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to fetch profile' 
      });
    }

    // Return null if no profile exists yet
    if (!profile) {
      return res.json({ profile: null });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get profile' 
    });
  }
});

/**
 * PUT /api/users/:userId/profile
 * Update or create user profile
 */
router.put('/:userId/profile', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    // Verify user can only update their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only update your own profile' 
      });
    }

    // Check if profile exists
    const { data: existingProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    const profilePayload = {
      user_id: userId,
      age: profileData.age,
      gender: profileData.gender,
      income: profileData.income,
      state: profileData.state,
      occupation: profileData.occupation,
      family_size: profileData.familySize,
      has_disability: profileData.hasDisability,
      residence: profileData.residence,
      category: profileData.category,
      updated_at: new Date().toISOString()
    };

    let result;
    if (existingProfile) {
      // Update existing profile
      result = await supabaseAdmin
        .from('user_profiles')
        .update(profilePayload)
        .eq('user_id', userId)
        .select()
        .single();
    } else {
      // Create new profile
      profilePayload.created_at = new Date().toISOString();
      result = await supabaseAdmin
        .from('user_profiles')
        .insert([profilePayload])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Profile update error:', result.error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to update profile' 
      });
    }

    res.json({
      message: 'Profile updated successfully',
      profile: result.data
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update profile' 
    });
  }
});

/**
 * GET /api/users/:userId/saved-schemes
 * Get user's saved schemes
 */
router.get('/:userId/saved-schemes', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only access your own saved schemes' 
      });
    }

    const { data: savedSchemes, error } = await supabaseAdmin
      .from('saved_schemes')
      .select(`
        id,
        saved_at,
        schemes (
          id,
          name,
          name_hi,
          category,
          category_hi,
          benefit,
          benefit_hi,
          deadline,
          description,
          ministry
        )
      `)
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) {
      console.error('Saved schemes fetch error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to fetch saved schemes' 
      });
    }

    // Transform the data to flatten the schemes object
    const formattedSchemes = savedSchemes.map(item => ({
      id: item.schemes.id,
      name: item.schemes.name,
      nameHi: item.schemes.name_hi,
      category: item.schemes.category,
      categoryHi: item.schemes.category_hi,
      benefit: item.schemes.benefit,
      benefitHi: item.schemes.benefit_hi,
      deadline: item.schemes.deadline,
      savedAt: item.saved_at
    }));

    res.json({ schemes: formattedSchemes });
  } catch (error) {
    console.error('Get saved schemes error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get saved schemes' 
    });
  }
});

/**
 * POST /api/users/:userId/saved-schemes
 * Save a scheme
 */
router.post('/:userId/saved-schemes', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const { schemeId } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only save schemes to your own profile' 
      });
    }

    if (!schemeId) {
      return res.status(400).json({ 
        error: 'Missing scheme ID',
        message: 'Scheme ID is required' 
      });
    }

    // Check if already saved
    const { data: existing } = await supabaseAdmin
      .from('saved_schemes')
      .select('id')
      .eq('user_id', userId)
      .eq('scheme_id', schemeId)
      .single();

    if (existing) {
      return res.status(409).json({ 
        error: 'Already saved',
        message: 'Scheme is already in your saved list' 
      });
    }

    // Save the scheme
    const { data, error } = await supabaseAdmin
      .from('saved_schemes')
      .insert([
        {
          user_id: userId,
          scheme_id: schemeId,
          saved_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Save scheme error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to save scheme' 
      });
    }

    res.status(201).json({
      message: 'Scheme saved successfully',
      savedScheme: data
    });
  } catch (error) {
    console.error('Save scheme error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to save scheme' 
    });
  }
});

/**
 * DELETE /api/users/:userId/saved-schemes/:schemeId
 * Remove a saved scheme
 */
router.delete('/:userId/saved-schemes/:schemeId', authenticate, async (req, res) => {
  try {
    const { userId, schemeId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only remove schemes from your own profile' 
      });
    }

    const { error } = await supabaseAdmin
      .from('saved_schemes')
      .delete()
      .eq('user_id', userId)
      .eq('scheme_id', schemeId);

    if (error) {
      console.error('Delete saved scheme error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Failed to remove saved scheme' 
      });
    }

    res.json({ message: 'Scheme removed from saved list' });
  } catch (error) {
    console.error('Remove saved scheme error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to remove saved scheme' 
    });
  }
});

export default router;
