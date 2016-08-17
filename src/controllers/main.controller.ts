'use strict';

// libs
import * as hapi from 'hapi';
const {get, controller} = require('hapi-decorators');
const hoek = require('hoek');

// app
import {getReports, createReportEmbedToken} from '../modules/powerbi-client';

@controller('/')
class MainController {

    @get('/')
    main(request: hapi.Request, reply: hapi.IReply) {
        getReports((error, response) => {
            hoek.assert(!error, error);
            let reports = response.value;
            reports = reports.map((report: any) => {
                report.token = createReportEmbedToken(report.id);
                return report;
            });
            reply.view('index', { title: 'Reports', reports });
        });
    }
}

const mainController: any = new MainController();

export const routes = mainController.routes();