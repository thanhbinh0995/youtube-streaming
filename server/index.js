import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Morgan from 'morgan';

const app = Express();

app
    .use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Morgan('combined'))
    .get('/', function(req, res) {
        res.send("thanh binh page")
    });

module.exports = app;