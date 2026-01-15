/**
 * Utility functions
 */

/**
 * Format error response
 */
export const formatError = (error, defaultMessage = 'An error occurred') => {
  return {
    error: error.name || 'Error',
    message: error.message || defaultMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate UUID format
 */
export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Map RAG occupation format to frontend format
 */
export const mapOccupation = (occupation) => {
  const occupationMap = {
    'govt_service': 'Government Service',
    'private': 'Private Sector',
    'business': 'Business Owner',
    'agriculture': 'Agriculture',
    'student': 'Student',
    'unemployed': 'Unemployed'
  };
  return occupationMap[occupation] || occupation;
};

/**
 * Map frontend category to RAG caste format
 */
export const mapCategory = (category) => {
  const categoryMap = {
    'general': 'General',
    'obc': 'OBC',
    'sc': 'SC',
    'st': 'ST',
    'ews': 'EWS'
  };
  return categoryMap[category] || category;
};

/**
 * Convert lakhs to rupees
 */
export const lakhsToRupees = (lakhs) => {
  return parseFloat(lakhs) * 100000;
};

/**
 * Convert rupees to lakhs
 */
export const rupeesToLakhs = (rupees) => {
  return (parseFloat(rupees) / 100000).toFixed(2);
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Generate a random token
 */
export const generateToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/**
 * Check if date has passed
 */
export const isPastDate = (dateString) => {
  const date = new Date(dateString);
  return date < new Date();
};

/**
 * Format date to Indian format (DD/MM/YYYY)
 */
export const formatIndianDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default {
  formatError,
  isValidEmail,
  isValidUUID,
  mapOccupation,
  mapCategory,
  lakhsToRupees,
  rupeesToLakhs,
  sanitizeInput,
  generateToken,
  isPastDate,
  formatIndianDate
};
