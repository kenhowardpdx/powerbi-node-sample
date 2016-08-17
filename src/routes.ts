'use strict';

// libs
import {Server} from 'hapi';
import * as path from 'path';

// app
import * as mainController from './controllers/main.controller';

export const register: any = function (
    server: Server, options, next
) {
    server.route({ method: 'GET', path: '/{param*}', handler: { directory: { path: 'public' } } });
    server.route(mainController.routes);

    next();
};

register.attributes = {
    name: 'Routes',
    version: '1.0.0'
};