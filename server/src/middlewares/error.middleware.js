import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    errors: error.errors || [],
    stack: env.NODE_ENV === 'production' ? undefined : error.stack
  });
};

