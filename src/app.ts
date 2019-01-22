import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { ERROR_CODES, ERROR_MESSAGES } from './constants/errors';
import { ServerError } from './models/server-error';
import WinstonLogger from './logger/winston-logger/winston-logger';
import loggerMiddlewareFactory from './logger/logger-middleware';
import routes from './routes/routes';

const app = express();

const logger = new WinstonLogger({});
const loggerMiddleware = loggerMiddlewareFactory(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware.requestMiddleware);

app.use(routes);

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(new ServerError(
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.NOT_FOUND]
    ));
});

app.use(loggerMiddleware.errorMiddleware);

app.use(function (error: ServerError, req: Request, res: Response, next: NextFunction) {
    const {
        errorCode,
        message,
        status
    } = error;
    res.status(status);
    res.json({
        errorCode,
        message: message || ERROR_MESSAGES[errorCode]
    });
});

export default app;
