import http from 'http';
import express from 'express';
import './config/logging';
import 'reflect-metadata';

import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import MainController from './controllers/main';
import { defineRoutes } from './modules/routes';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('---------------------------------------');
    logging.info('Initializing API');
    logging.info('---------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.info('---------------------------------------');
    logging.info('Logging & Configuration');
    logging.info('---------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('---------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------------');
    defineRoutes([MainController], application);

    logging.info('---------------------------------------');
    logging.info('Define Routing Error');
    logging.info('---------------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('---------------------------------------');
        logging.info('Server Started: ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        logging.info('---------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
