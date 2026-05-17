import { required, validate } from '../middlewares/validate.middleware.js';

export const generateTestsValidator = validate([required('projectId'), required('goal')]);
export const regenerateTestsValidator = validate([required('generationId')]);

