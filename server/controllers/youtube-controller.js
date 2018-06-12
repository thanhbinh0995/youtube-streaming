'use strict';

import FluentFfmpeg from 'fluent-ffmpeg';
import {broadcastParams, oauth2Client, streamParams} from '../config/index';
import moment from 'moment';
import {google} from 'googleapis';
const youtube = google.youtube('v3');

export default class YoutubeController {

    stream = async (req, res) => {
        try {
            youtube.liveBroadcasts.insert(broadcastParams, function (err, broadcast) {
                if (err) {
                    return console.log('Error creating broadcast: ', err);
                }
                console.log("broadcast data");
                console.log(broadcast.data);

                youtube.liveStreams.insert(streamParams, function (err, stream) {
                    if (err) {
                        return console.log('Error creating stream: ', err);
                    }
                    console.log("stream data");
                    console.log(stream.data);
                    const startTime = moment().add(10, 'm');
                    const endTime = moment().add(30, 'm');
                    const broadcastStreamParams = {
                        auth: oauth2Client,
                        part: "id,snippet,status,contentDetails",
                        resource: {
                            id: broadcast.data.id,
                            snippet: {
                                title: "Testing NodeJS Demo",
                                scheduledStartTime: startTime,
                                scheduledEndTime: endTime,
                            },
                            status: {
                                privacyStatus: "private",
                            },
                            contentDetails: {
                                boundStreamId: stream.data.id
                            }
                        }
                    };
                    youtube.liveBroadcasts.insert(broadcastStreamParams, function (err, broadcastStream) {
                        if (err) {
                            return console.log('Error bind broadcast stream: ', err);
                        }
                        console.log("broadcast stream data");
                        console.log(broadcastStream.data);
                        FluentFfmpeg('rtmp://localhost/live/testStream')
                            .videoCodec('libx264')
                            .audioCodec('libfaac')
                            .audioBitrate('128k')
                            .audioChannels('1')
                            .audioFrequency(44100)
                            .withSize('426x240')
                            .withFps(30)
                            .outputOptions(['-g 1', '-force_key_frames 2'])
                            .on('start', () => {
                                console.log('FFmpeg start with ')
                            })
                            .on('progress', (progress) => {
                                console.log('Processing: % done');
                                const streamsParams = {
                                    auth: oauth2Client,
                                    part: "id",
                                    resource: {
                                        id: stream.data.id
                                    }
                                };
                                youtube.liveStreams.list(streamsParams, (err, test) => {
                                    if (err) {
                                        console.log("error when transit")
                                    }
                                    console.log(test);
                                });
                                console.log('Processing: ' + progress.percent + '% done');
                            })
                            .on('end', () => {
                                console.log('Processing finished !');
                            });
                    });
                });
            });
            return res.json({msg: 'Stream Youtube'});
        } catch (e) {
            return res.json(e);
        }
    };
}