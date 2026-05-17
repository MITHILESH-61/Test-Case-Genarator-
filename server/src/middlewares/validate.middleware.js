import { ApiError } from '../utils/ApiError.js';

export const validate = (rules) => (req, res, next) => {
  const errors = rules.map((rule) => rule(req)).filter(Boolean);

  if (errors.length) {
    next(new ApiError(400, 'Validation failed', errors));
    return;
  }

  next();
};

export const required = (field, location = 'body') => (req) => {
  const value = req[location]?.[field];

  if (value === undefined || value === null || String(value).trim() === '') {
    return `${field} is required`;
  }

  return null;
};

export const validEmail = (field = 'email') => (req) => {
  const value = req.body?.[field];

  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'A valid email is required';
  }

  return null;
};

export const minLength = (field, min) => (req) => {
  const value = req.body?.[field];

  if (!value || String(value).length < min) {
    return `${field} must be at least ${min} characters`;
  }

  return null;
};

