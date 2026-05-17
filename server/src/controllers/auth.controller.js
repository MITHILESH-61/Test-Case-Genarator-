import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as authService from '../services/auth.service.js';

export const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  sendSuccess(res, result, 'Account created', 201);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  sendSuccess(res, result, 'Logged in');
});

export const logout = asyncHandler(async (req, res) => {
  sendSuccess(res, {}, 'Logged out');
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, { user: authService.getCurrentUser(req.user) }, 'Current user');
});

