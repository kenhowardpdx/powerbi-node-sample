'use strict';

// libs
import * as powerbi from 'powerbi-api';
import * as msrest from 'ms-rest';

const ACCESS_KEY = process.env.POWERBI_ACCESS_KEY;
const USERNAME =  process.env.POWERBI_USERNAME;
const ROLES =  JSON.parse(process.env.POWERBI_ROLES);
const WORKSPACE_COLLECTION = process.env.POWERBI_WORKSPACE_COLLECTION;
const WORKSPACE_ID = process.env.POWERBI_WORKSPACE_ID;

const credentials = new msrest.TokenCredentials(ACCESS_KEY, 'AppKey');
export const client = new powerbi.PowerBIClient(credentials);

export function createReportEmbedToken(reportId: string) {
    const token = powerbi.PowerBIToken.createReportEmbedToken(WORKSPACE_COLLECTION, WORKSPACE_ID, reportId, USERNAME, ROLES);
    return token.generate(ACCESS_KEY);
}

export function getReports(callback: msrest.ServiceCallback<powerbi.ODataResponseListReport>) {
    client.reports.getReports(WORKSPACE_COLLECTION, WORKSPACE_ID, callback);
}