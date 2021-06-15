import 'reflect-metadata';
import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import { Logger, PREFIX_LOG } from './utils/logger';
import Environment from './environment';
import connect from './mongoose';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { controllers } from './controllers';

const app = express();

const init = async () => {
    // security lib
    app.use(helmet());

    // cors whitelist
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Compress all responses
    app.use(compression());

    // Connect to database
    await connect(app);

    // logger middleware for the routes -> morgan is too much for this
    app.use(loggerMiddleware);

    controllers.map((controller) => {
        app.use('/api/v1', controller.router);
    });

    app.listen(Environment.port, () => {
        Logger.success(`[${PREFIX_LOG}]: listening on http://localhost:${Environment.port}`);
    });

    return `[${PREFIX_LOG}]: Ready!`;
};

init().then(Logger.success);

export default app;

process.on('unhandledRejection', (reason, p) => {
    Logger.error('Unhandled Rejection at: Promise ');
    Logger.error(p);
    Logger.error(reason);
});
