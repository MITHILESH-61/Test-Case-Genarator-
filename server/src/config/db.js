import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const getMongoConnectionHint = (error) => {
  if (error?.code === 8000 || /bad auth|Authentication failed/i.test(error?.message || '')) {
    return [
      'MongoDB authentication failed.',
      'Check that MONGODB_URI uses a MongoDB Database Access user, not your Atlas login.',
      'If the password contains special characters, URL-encode it before placing it in the URI.',
      'Make sure the URI includes the target database name, for example /test-case-generator before the query string.'
    ].join(' ');
  }

  if (/querySrv|ENOTFOUND|ETIMEOUT|ECONNREFUSED/i.test(error?.message || '')) {
    return 'MongoDB connection failed. Check the host, network access allowlist, VPN/firewall, and whether MongoDB is running.';
  }

  return 'MongoDB connection failed.';
};

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  try {
    const connection = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    const hint = getMongoConnectionHint(error);
    error.message = `${hint} Original error: ${error.message}`;
    throw error;
  }
};
