'use strict';

// libs
import {compose} from 'glue';
import {Server} from 'hapi';

// app
import * as manifest from './manifest';

compose(manifest.get('/'), { relativeTo: __dirname }, (err, server) => {
    const web = server.select('web');
    if (!module.parent) {
        server.start(() =>
            server.log('info', 'Server running at: ' + (<Server>web).info.uri)
        );
    }
});