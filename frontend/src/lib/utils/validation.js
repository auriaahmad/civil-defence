// Validation utilities for Pakistani formats

/**
 * Validate Pakistani CNIC format (13 digits: XXXXX-XXXXXXX-X)
 * @param {string} cnic - CNIC to validate
 * @returns {boolean} - True if valid
 */
export const validateCNIC = (cnic) => {
  if (!cnic) return false;

  // Remove dashes and spaces
  const cleanCNIC = cnic.replace(/[-\s]/g, '');

  // Check if exactly 13 digits
  const cnicRegex = /^\d{13}$/;
  return cnicRegex.test(cleanCNIC);
};

/**
 * Format CNIC with dashes (XXXXX-XXXXXXX-X)
 * @param {string} cnic - CNIC to format
 * @returns {string} - Formatted CNIC
 */
export const formatCNIC = (cnic) => {
  if (!cnic) return '';

  // Remove all non-digit characters
  const cleanCNIC = cnic.replace(/\D/g, '');

  // Apply formatting
  if (cleanCNIC.length <= 5) {
    return cleanCNIC;
  } else if (cleanCNIC.length <= 12) {
    return `${cleanCNIC.slice(0, 5)}-${cleanCNIC.slice(5)}`;
  } else {
    return `${cleanCNIC.slice(0, 5)}-${cleanCNIC.slice(5, 12)}-${cleanCNIC.slice(12, 13)}`;
  }
};

/**
 * Validate Pakistani phone number
 * Formats: +92-XXX-XXXXXXX, 03XX-XXXXXXX, 0XX-XXXXXXXX
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const validatePhone = (phone) => {
  if (!phone) return false;

  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  // Check various Pakistani phone formats
  const patterns = [
    /^\+92\d{10}$/,           // +92XXXXXXXXXX (10 digits after country code)
    /^92\d{10}$/,             // 92XXXXXXXXXX
    /^0\d{10}$/,              // 0XXXXXXXXXX (11 digits starting with 0)
    /^03\d{9}$/,              // 03XXXXXXXXX (mobile - 11 digits)
  ];

  return patterns.some(pattern => pattern.test(cleanPhone));
};

/**
 * Format Pakistani phone number
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters except +
  let cleanPhone = phone.replace(/[^\d+]/g, '');

  // Format based on length and prefix
  if (cleanPhone.startsWith('+92')) {
    const digits = cleanPhone.slice(3);
    if (digits.length <= 3) {
      return `+92-${digits}`;
    } else {
      return `+92-${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
  } else if (cleanPhone.startsWith('92')) {
    const digits = cleanPhone.slice(2);
    if (digits.length <= 3) {
      return `+92-${digits}`;
    } else {
      return `+92-${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
  } else if (cleanPhone.startsWith('0')) {
    if (cleanPhone.length <= 4) {
      return cleanPhone;
    } else {
      return `${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4)}`;
    }
  }

  return cleanPhone;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Calculate age from date of birth
 * @param {string} dateOfBirth - Date of birth (YYYY-MM-DD)
 * @returns {number} - Age in years
 */
export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return 0;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Validate minimum age requirement (18 years)
 * @param {string} dateOfBirth - Date of birth (YYYY-MM-DD)
 * @returns {boolean} - True if age >= 18
 */
export const validateMinimumAge = (dateOfBirth) => {
  const age = calculateAge(dateOfBirth);
  return age >= 18;
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} - True if not empty
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

/**
 * Validate text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if length is within range
 */
export const validateLength = (text, minLength = 0, maxLength = Infinity) => {
  if (!text) return minLength === 0;
  const length = text.trim().length;
  return length >= minLength && length <= maxLength;
};

/**
 * Validate name (letters, spaces, and Pakistani characters)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
export const validateName = (name) => {
  if (!name) return false;

  // Allow English letters, spaces, and Urdu characters
  const nameRegex = /^[a-zA-Z\s\u0600-\u06FF]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const validateURL = (url) => {
  if (!url) return true; // URL is optional

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get validation error message
 * @param {string} field - Field name
 * @param {string} type - Validation type
 * @returns {string} - Error message
 */
export const getValidationError = (field, type) => {
  const errors = {
    required: `${field} is required`,
    cnic: 'Please enter a valid 13-digit CNIC',
    phone: 'Please enter a valid Pakistani phone number',
    email: 'Please enter a valid email address',
    age: 'You must be at least 18 years old to register',
    name: 'Please enter a valid name (letters only)',
    url: 'Please enter a valid URL',
    length: `${field} length is invalid`,
  };

  return errors[type] || `${field} is invalid`;
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
