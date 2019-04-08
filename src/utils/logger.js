import fs from 'fs';
import winston, { format } from 'winston';

import 'winston-daily-rotate-file';

// Use LOG_DIR from env
const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Format the logging output.
const infoFormat = format.printf(info => {
  if(info instanceof Error) {
    return `${info.timestamp} - ${info.level} - ${info.message} - ${info.stack}`;
  }

  return `${info.timestamp} - ${info.level} - ${info.message} ${info.meta ? '-' + info.meta : ''}`;
});

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), infoFormat),
      maxFiles: '15d',
      level: LOG_LEVEL,
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log',
      zippedArchive: true,
      json: false,
      handleExceptions: true,
      humanReadableUnhandledException: true,
    })
  ]
});

/**
 *  If not is the production enable logging to the console.
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.colorize(), infoFormat),
    level: 'info',
    handleExceptions: true
  }));
}

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

// By default, winston will exit after logging an uncaughtException. So overriding the behaviour.
logger.exitOnError = false;

export default logger;
