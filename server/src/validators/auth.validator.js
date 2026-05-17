import { minLength, required, validEmail, validate } from '../middlewares/validate.middleware.js';

export const signupValidator = validate([
  required('name'),
  validEmail('email'),
  minLength('password', 8)
]);

export const loginValidator = validate([
  validEmail('email'),
  required('password')
]);

