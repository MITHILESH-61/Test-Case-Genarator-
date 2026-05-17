import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

const createToken = (user) => {
  return jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt
});

export const signup = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new ApiError(409, 'An account already exists for this email');
  }

  const user = await User.create({ name, email, password });

  return {
    user: sanitizeUser(user),
    token: createToken(user)
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return {
    user: sanitizeUser(user),
    token: createToken(user)
  };
};

export const getCurrentUser = (user) => sanitizeUser(user);

