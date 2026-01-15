/**
 * Supabase Database Schema
 * 
 * Run these SQL commands in your Supabase SQL Editor to set up the database
 */

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  google_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles table (eligibility data)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  income NUMERIC,
  state TEXT,
  occupation TEXT,
  family_size INTEGER,
  has_disability BOOLEAN DEFAULT FALSE,
  residence TEXT, -- 'urban' or 'rural'
  category TEXT, -- 'general', 'obc', 'sc', 'st', 'ews'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Schemes table
CREATE TABLE IF NOT EXISTS schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_hi TEXT,
  category TEXT NOT NULL,
  category_hi TEXT,
  benefit TEXT NOT NULL,
  benefit_hi TEXT,
  deadline TEXT,
  deadline_hi TEXT,
  description TEXT,
  description_hi TEXT,
  eligibility JSONB, -- Array of eligibility criteria
  eligibility_hi JSONB,
  benefits JSONB, -- Array of benefits
  benefits_hi JSONB,
  documents JSONB, -- Array of required documents
  documents_hi JSONB,
  application_process JSONB, -- Array of steps
  application_process_hi JSONB,
  official_website TEXT,
  ministry TEXT,
  ministry_hi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved schemes table (junction table)
CREATE TABLE IF NOT EXISTS saved_schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scheme_id)
);

-- User documents table
CREATE TABLE IF NOT EXISTS user_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'aadhar_card', 'pan_card', etc.
  has_document BOOLEAN DEFAULT FALSE,
  uploaded_file TEXT, -- URL to file in Supabase Storage
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, document_type)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_ministry ON schemes(ministry);
CREATE INDEX IF NOT EXISTS idx_saved_schemes_user_id ON saved_schemes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_schemes_scheme_id ON saved_schemes(scheme_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User Profiles: Users can manage their own profile
CREATE POLICY "Users can read own user_profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user_profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own user_profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Schemes: Everyone can read schemes
CREATE POLICY "Anyone can read schemes" ON schemes
  FOR SELECT USING (true);

-- Saved Schemes: Users can manage their own saved schemes
CREATE POLICY "Users can read own saved_schemes" ON saved_schemes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved_schemes" ON saved_schemes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved_schemes" ON saved_schemes
  FOR DELETE USING (auth.uid() = user_id);

-- User Documents: Users can manage their own documents
CREATE POLICY "Users can read own documents" ON user_documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON user_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON user_documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON user_documents
  FOR DELETE USING (auth.uid() = user_id);

-- Create Storage Bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can read own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
