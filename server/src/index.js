import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env, validateEnv } from './config/env.js';
import { logger } from './utils/logger.js';

validateEnv();

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});

