'use strict';

import SwaggerJSDoc from 'swagger-jsdoc';
import {env} from '../config/index';
import {publicController} from '../controllers/index';

module.exports = (app, router) => {

    app
        .route('*')
        .get(publicController.index)
        .post(publicController.index);


    if (env === 'development') {
        const swaggerDefinition = {
            info: {
                title: 'Node Swagger API',
                version: '1.0.1',
                description: 'Demonstrating how to desribe a RESTful API with Swagger',
            },
            host: 'localhost:9000',
            basePath: '/',
        };

        const options = {
            // import swaggerDefinitions
            swaggerDefinition: swaggerDefinition,
            // path to the API docs
            apis: ['./controllers/api/*.js'],
        };


        // initialize swagger-jsdoc
        const swaggerSpec = SwaggerJSDoc(options);


        app.get('/swagger.json', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
    }

};