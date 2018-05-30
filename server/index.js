import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Morgan from 'morgan';
import FS from 'fs-extra';
import {google} from 'googleapis';
import Path from 'path';
import Pusher from 'pusher'
const app = Express();

const OAuth2 = google.auth.OAuth2;
const youtube = google.youtube('v3');
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, //CLIENT_ID
    process.env.CLIENT_SECRET, //MY_CLIENT_SECRET,
    'http://localhost:5000/api/integrations/youtube' //YOUR_REDIRECT_URL
);

oauth2Client.setCredentials({
    access_token: "ya29.GlvLBXNzclM38XEYmIAD_abqwDReztwdKvEY-XWu_IPbzU6uElgOVVBfI7rTPyDL3GgaR70nQQUaOAhtlx-OcT4G9gGxZRR0ob1xUScsU_GPqVzMWpivaM0coBlk",
    refresh_token: "1/9sbtmm6313uP5vZs_P5_IjXXq4bcjCOp-EPNC-xcZso"
});

const broadcastParams = {
    "auth": oauth2Client,
    "part": "snippet,status,contentDetails",
    "resource": {
        "snippet": {
            "title": "Testing NodeJS 123",
            "scheduledStartTime": "2018-05-30T10:26:58.000Z",
            "scheduledEndTime": "2018-05-30T10:30:58.000Z",
        },
        "status": {
            "privacyStatus": "private",
        },
        "contentDetails": {
            "monitorStream": {
                "enableMonitorStream": true,
            }
        }
    }
};

youtube.liveBroadcasts.insert(broadcastParams,  function(err,broadcast) {
    if (err) {
        return console.log('Error creating broadcast: ', err);
    }
    console.log('Broadcast = ', broadcast);
});


const router = Express.Router();
app
    .use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Morgan('combined'))
    .post("/pusher/auth", (req, res) => {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const presenceData = {
            user_id:
            Math.random()
                .toString(36)
                .slice(2) + Date.now()
        };
        const auth = pusher.authenticate(socketId, channel, presenceData);
        res.send(auth);
    })
    .set('views', Path.join(__dirname, '..', 'public', 'views'))
    .set('view engine', 'ejs');

const routePath = `${__dirname}/routes/`;
FS
    .readdirSync(routePath)
    .forEach((fileName) => {
        require(`${routePath}${fileName}`)(app, router);
    });
module.exports = app;