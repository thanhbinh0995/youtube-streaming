'use strict';

import {youtubeController} from '../controllers/index';

module.exports = (app, router) => {

    router
        .route('/stream')
        .get(youtubeController.stream);

};