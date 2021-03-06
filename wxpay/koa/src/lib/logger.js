import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

import config from '../config';
const {
  LOG_LEVEL,
  LOG_PATH,
} = config;

const errorLogPath = path.join(LOG_PATH, `%DATE%.error.log`);
const infoLogPath = path.join(LOG_PATH, `%DATE%.info.log`);
const debugLogPath = path.join(LOG_PATH, `%DATE%.debug.log`);

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);
const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({ filename: errorLogPath, level: 'error' }),
    new (winston.transports.DailyRotateFile)({ filename: infoLogPath, level: 'info' }),
    new (winston.transports.DailyRotateFile)({ filename: debugLogPath })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
