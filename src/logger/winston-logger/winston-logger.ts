import {
    createLogger,
    format,
    transports,
    Logger as LoggerInstance,
} from 'winston';
import { Logger } from '../logger';
import print from './formatters/print';
import { DEFAULT_ERROR_FILENAME, DEFAULT_LOG_FILENAME } from '../../constants/logger';
import { NODE_ENV } from '../../config/env';

const LEVELS = {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug'
};

type WinstonLoggerParams = {
    errorFileName?: string,
    logFileName?: string
};

class WinstonLogger implements Logger {
    private logger: LoggerInstance;

    constructor({
        errorFileName = DEFAULT_ERROR_FILENAME,
        logFileName = DEFAULT_LOG_FILENAME
    }: WinstonLoggerParams) {
        this.logger = createLogger({
            level: LEVELS.DEBUG,
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(print)
            ),
            transports: [
                new transports.File({ filename: errorFileName, level: LEVELS.ERROR }),
                new transports.File({ filename: logFileName })
            ]
        });

        if (NODE_ENV === 'development') {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.printf(print)
                ),
            }));
        }
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }
}

export default WinstonLogger;
