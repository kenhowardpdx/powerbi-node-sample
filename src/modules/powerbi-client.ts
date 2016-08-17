'use strict';

// libs
import * as powerbi from 'powerbi-api';
import * as msrest from 'ms-rest';

interface IReport extends powerbi.Report {
    token: string;
}

const ACCESS_KEY = process.env.POWERBI_ACCESS_KEY;
const USERNAME =  process.env.POWERBI_USERNAME;
const ROLES =  JSON.parse(process.env.POWERBI_ROLES);
const WORKSPACE_COLLECTION = process.env.POWERBI_WORKSPACE_COLLECTION;
const WORKSPACE_ID = process.env.POWERBI_WORKSPACE_ID;

const credentials = new msrest.TokenCredentials(ACCESS_KEY, 'AppKey');
const client = new powerbi.PowerBIClient(credentials);

function createReportEmbedToken(reportId: string) {
    const token = powerbi.PowerBIToken.createReportEmbedToken(WORKSPACE_COLLECTION, WORKSPACE_ID, reportId, USERNAME, ROLES);
    return token.generate(ACCESS_KEY);
}

function getReports() {
    return new Promise<powerbi.Report[]>((resolve, reject) => client.reports.getReports(WORKSPACE_COLLECTION, WORKSPACE_ID, (error, response) => {
        if (error) {
            reject(error);
        } else {
            resolve(response.value);
        }
    }));
}

export async function getReportsAsync() {
    return await getReports();
}

export async function getReportAsync(reportId: string) {
    let reports = await getReports();
    let [report] = <IReport[]>reports.filter(r => r.id === reportId);
    report.token = createReportEmbedToken(reportId);
    return report;
}