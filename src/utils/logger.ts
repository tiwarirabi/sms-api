import * as fs from 'fs';
import * as stream from 'stream';
import * as winston from 'winston';
import * as winstonDailyRotate from 'winston-daily-rotate-file';

import config from '../config/config';

const { level, path } = config.logging;

// Create log path if it does not exist
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const transports = [];

// Add transports if not test environment.
if (!config.app.isTestEnvironment) {
  transports.push(
    new winston.transports.Console({
      level,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
  transports.push(
    new winstonDailyRotate({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      maxFiles: '14d',
      level: config.logging.level,
      dirname: config.logging.path,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log'
    })
  );
}

// Create a logger using the configuration.
const logger = winston.createLogger({ transports });

/**
 * A writable stream for winston logging.
 */
export const logStream = new stream.Writable({
  write(message: any) {
    logger.info(message.toString());
  }
});

export default logger;
