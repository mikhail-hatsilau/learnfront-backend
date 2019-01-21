import { NextFunction, Request, Response } from 'express';
import { Logger } from './logger';
import { ServerError } from '../models/server-error';

const buildInfoMessage = (req: Request) => {
    const {
        body,
        protocol,
        url,
        method
    } = req;
    const uppercaseProtocol = protocol.toUpperCase();
    const uppercaseMethod = method.toUpperCase();
    return `${uppercaseProtocol} ${url} ${uppercaseMethod}, Body: ${JSON.stringify(body)}`;
};

const buildErrorMessage = (err: ServerError) => {
    const {
        status,
        stack
    } = err;
    return `Response code: ${status}\n${stack}`;
};

const requestMiddleware = (logger: Logger) =>
    (req: Request, res: Response, next: NextFunction) => {
        logger.info(buildInfoMessage(req));
        next();
    };

const errorMiddleware = (logger: Logger) =>
    (error: ServerError, req: Request, res: Response, next: NextFunction) => {
        logger.error(`${buildInfoMessage(req)}\n${buildErrorMessage(error)}`);
        next(error);
    };

export default (logger: Logger) => ({
    requestMiddleware: requestMiddleware(logger),
    errorMiddleware: errorMiddleware(logger)
});
