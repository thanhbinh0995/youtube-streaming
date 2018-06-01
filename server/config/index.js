'use strict';

const DotENV = require('dotenv');
import moment from 'moment';
import {google} from 'googleapis';
const OAuth2 = google.auth.OAuth2;
DotENV.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callback = process.env.CALLBACK;
const accessToken = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;
const oauth2Client = new OAuth2(clientId, clientSecret, callback);
oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
});

const broadcastParams = {
    "auth": oauth2Client,
    "part": "snippet,status,contentDetails",
    "resource": {
        "snippet": {
            "title": "Testing NodeJS 123",
            "scheduledStartTime": "2018-06-01T11:12:58.000Z",
            "scheduledEndTime": "2018-06-01T11:40:58.000Z",
        },
        "status": {
            "privacyStatus": "private",
        },
        "contentDetails": {
            "monitorStream": {
                "enableMonitorStream": true,
                "enableDvr": true
            }
        }
    }
};


const streamParams = {
    "auth": oauth2Client,
    "part": "snippet,cdn",
    "resource": {
        "snippet": {
            "title": "ly 240p"
        },
        "cdn": {
            "format": "240p",
            "ingestionType": "rtmp",
        }
    }
};

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    clientId: clientId,
    clientSecret: clientSecret,
    callback: callback,
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
    broadcastParams: broadcastParams,
    streamParams: streamParams,
};