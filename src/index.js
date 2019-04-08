import {} from 'dotenv/config';
import express from 'express';
import logger from './utils/logger';

// Creating the express app.
const app = express();


// Starting up the express server.
app.listen(process.env.PORT, error => {
  if (error) {
    logger.error(`Unexpected error occurred while starting the express server.  error : ${JSON.stringify(error)}`);
    throw error;
  } else {
    logger.info(`Server started to run on Port: ${process.env.PORT} and Running on ${process.env.NODE_ENV} Mode.!`);
  }
});

// Catch unhandled rejections
process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection', err);

  try {
    // Sentry.captureException(err);
  } catch (err) {
    logger.error('Raven error', err);
  } finally {
    process.exit(1);
  }
});

// Catch uncaught exceptions
process.on('uncaughtException', err => {
  logger.error('Uncaught exception', err);

  try {
    // Sentry.captureException(err);
  } catch (err) {
    logger.error('Raven error', err);
  } finally {
    process.exit(1);
  }
});
