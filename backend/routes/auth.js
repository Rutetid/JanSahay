import express from 'express';
import { supabase, supabaseAdmin } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user with email and password
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Email, password, and name are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Invalid password',
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Create user with Supabase Auth (with email confirmation)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar: null
        },
        emailRedirectTo: `${process.env.FRONTEND_URL}/auth/verify`
      }
    });

    if (error) {
      return res.status(400).json({ 
        error: 'Signup failed',
        message: error.message 
      });
    }

    // Create user profile in database
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          name: name,
          email: email,
          avatar: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail the signup if profile creation fails
    }

    res.status(201).json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: name,
        avatar: null,
        emailVerified: false
      },
      requiresEmailVerification: true
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to create user' 
    });
  }
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Missing credentials',
        message: 'Email and password are required' 
      });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ 
        error: 'Login failed',
        message: error.message 
      });
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || data.user.user_metadata?.name || 'User',
      avatar: profile?.avatar || data.user.user_metadata?.avatar || null
    };

    res.json({
      message: 'Login successful',
      user: userData,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to login' 
    });
  }
});

/**
 * POST /api/auth/verify-email
 * Verify email with token from email link
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { token, type } = req.body;

    if (!token || !type) {
      return res.status(400).json({ 
        error: 'Missing parameters',
        message: 'Token and type are required' 
      });
    }

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type
    });

    if (error) {
      return res.status(400).json({ 
        error: 'Verification failed',
        message: error.message 
      });
    }

    res.json({
      message: 'Email verified successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || 'User',
        avatar: data.user.user_metadata?.avatar || null,
        emailVerified: true
      },
      session: data.session
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to verify email' 
    });
  }
});

/**
 * POST /api/auth/resend-verification
 * Resend verification email
 */
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Missing email',
        message: 'Email is required' 
      });
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${process.env.FRONTEND_URL}/auth/verify`
      }
    });

    if (error) {
      return res.status(400).json({ 
        error: 'Resend failed',
        message: error.message 
      });
    }

    res.json({ 
      message: 'Verification email sent successfully' 
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to resend verification email' 
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout current user
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ 
        error: 'Logout failed',
        message: error.message 
      });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to logout' 
    });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    // Get user profile from database
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
    }

    const userData = {
      id: req.user.id,
      email: req.user.email,
      name: profile?.name || req.user.user_metadata?.name || 'User',
      avatar: profile?.avatar || req.user.user_metadata?.avatar || null
    };

    res.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get user data' 
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ 
        error: 'Missing refresh token',
        message: 'Refresh token is required' 
      });
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) {
      return res.status(401).json({ 
        error: 'Refresh failed',
        message: error.message 
      });
    }

    res.json({
      message: 'Token refreshed successfully',
      session: data.session
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to refresh token' 
    });
  }
});

export default router;
