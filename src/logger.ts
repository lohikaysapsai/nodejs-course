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

enum MsgTypes {
  INFO = 'INFO',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR'
};

const showInConsoleProc = (msg: string, type: MsgTypes = MsgTypes.INFO, showInConsole: boolean = false): void => {
  if (showInConsole) {
    console.log(`[${MsgTypes[type]}] : ${msg}`);
  }
};

export const logInfo = (msg: string, showInConsole: boolean = false): void => {
  logger.info(msg);
  showInConsoleProc(msg, MsgTypes.INFO, showInConsole);
}

export const logDebug = (msg: string, showInConsole: boolean = false): void => {
  logger.debug(msg);
  showInConsoleProc(msg, MsgTypes.DEBUG, showInConsole);
}

export const logWarn = (msg: string, showInConsole: boolean = false): void => {
  logger.warn(msg);
  showInConsoleProc(msg, MsgTypes.WARN, showInConsole);
}

export const logError = (msg: string, showInConsole: boolean = false): void => {
  logger.error(msg);
  showInConsoleProc(msg, MsgTypes.ERROR, showInConsole);
}
