import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: './log-info.log', level: 'info'}),
    new winston.transports.File({ filename: './log-error.log', level: 'error' }),
  ],
});

export const logInfo = (msg: string): void => {
  logger.info(msg);
}

export const logDebug = (msg: string): void => {
  logger.debug(msg);
}

export const logWarn = (msg: string): void => {
  logger.warn(msg);
}

export const logError = (msg: string): void => {
  logger.error(msg);
}
