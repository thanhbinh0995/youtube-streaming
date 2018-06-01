'use strict';

import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Morgan from 'morgan';
import {google} from 'googleapis';
import Path from 'path';
import fluentFfmpeg from 'fluent-ffmpeg';
import {broadcastParams, streamParams} from './config/index';
const app = Express();

const youtube = google.youtube('v3');

youtube.liveBroadcasts.insert(broadcastParams, function (err, data) {
    if (err) {
        return console.log('Error creating broadcast: ', err);
    }
    console.log("broadcast data");
    console.log(data.data);
});

youtube.liveStreams.insert(streamParams, function (err, data) {
    if (err) {
        return console.log('Error creating stream: ', err);
    }
    console.log("stream data");
    console.log(data.data);
});


const file = Path.join(__dirname, 'server', 'uploads', 'test.mp4');

fluentFfmpeg(file)
    .videoCodec('libx264')
    .audioCodec('libfaac')
    .audioBitrate('128k')
    .audioChannels('1')
    .audioFrequency(44100)
    .size('426x240')
    .fps(30)
    .outputOptions(['-g 1', '-force_key_frames 2'])
    .on('start', () => {
        console.log('FFmpeg start with ')
    })
    .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
    })
    .on('end', () => {
        console.log('Processing finished !');
    });

app
    .use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Morgan('combined'))
    .set('views', Path.join(__dirname, '..', 'public', 'views'))
    .set('view engine', 'ejs');

module.exports = app;