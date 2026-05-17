import { required, validate } from '../middlewares/validate.middleware.js';

export const createProjectValidator = validate([required('projectName')]);

