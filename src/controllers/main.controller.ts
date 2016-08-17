'use strict';

// libs
import * as hapi from 'hapi';
const {get, controller} = require('hapi-decorators');
const hoek = require('hoek');

// app
import {getReportsAsync, getReportAsync} from '../modules/powerbi-client';

@controller('/')
class MainController {

    @get('/')
    async main(request: hapi.Request, reply: hapi.IReply) {
        let reports = await getReportsAsync();
        reply.view('index', { title: 'Reports', reports });
    }

    @get('/report/{id}')
    async report(request: hapi.Request, reply: hapi.IReply) {
        let reportId = request.params['id'];
        let report = await getReportAsync(reportId);
        reply.view('report', { title: `Report: ${report.name}`, report })
    }
}

const mainController: any = new MainController();

export const routes = mainController.routes();