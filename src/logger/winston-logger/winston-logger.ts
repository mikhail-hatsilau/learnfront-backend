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
import {ConsoleTransportInstance, FileTransportInstance} from "winston/lib/winston/transports";

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
        const transportsToUse = [
            ...(NODE_ENV !== 'test' ? [
                new transports.File({ filename: errorFileName, level: LEVELS.ERROR }),
                new transports.File({ filename: logFileName })
            ] : []),
            ...(NODE_ENV !== 'production' ? [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.printf(print)
                    ),
                })
            ] : [])
        ];
        this.logger = createLogger({
            level: LEVELS.DEBUG,
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(print)
            ),
            transports: transportsToUse
        });
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
