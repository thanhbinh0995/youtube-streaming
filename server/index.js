'use strict';

import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Morgan from 'morgan';
import FS from 'fs-extra';

const app = Express();

const router = Express.Router();
app
    .use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Morgan('combined'))
    .use('/api', router);

const routePath = `${__dirname}/routes/`;
FS
    .readdirSync(routePath)
    .forEach((fileName) => {
        require(`${routePath}${fileName}`)(app, router);
    });

module.exports = app;