/* $lab:coverage:off$ */
'use strict';

// libs
import {Store} from 'confidence';
import {readFileSync} from 'fs';
import * as path from 'path';

const criteria = {
    server_group: process.env.SERVER_GROUP || 'development',
    log_level: process.env.LOG_LEVEL || 'verbose'
};

const config = {
    $meta: 'Config file',
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
        routes: {
            cors: {
                origin: [process.env.CORS_ORIGIN || 'http://localhost:3000']
            },
            jsonp: 'callback'
        },
        labels: ['web']
    },
    good: {
        ops: {
            interval: 1000
        },
        reporters: {
            console: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [
                        {
                            '$filter': 'log_level',
                            minimal: {
                                log: '*',
                                response: '*',
                                request: '*'
                            },
                            verbose: {
                                log: '*',
                                error: '*',
                                response: '*',
                                request: '*'
                            }
                        }
                    ]
                },
                {
                    module: 'good-console'
                },
                'stdout'
            ],
        }
    },
    qs: {
        qsOptions: {
            depth: 10
        }
    },
    visionary: {
        context: {
            appTitle: 'Power BI Embedded Samples'
        },
        engines: { html: 'handlebars' },
        relativeTo: __dirname,
        path: '../views',
        layout: true,
        layoutPath: '../views/layout',
        partialsPath: '../views/partials',
        helpersPath: './view-helpers'
    },
    routes: {
        feed: {
            feedPingInterval: (process.env.FEED_PING_INTERVAL || 30) * 1000
        }
    }
};

const store = new Store(config);

export const get = key => store.get(key, criteria);
export const meta = key => store.meta(key, criteria);