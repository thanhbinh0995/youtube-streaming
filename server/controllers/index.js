'use strict';

import UserController from './user-controller';
import PublicController from  './public-controller';

module.exports = {
    userController: new UserController(),
    publicController: new PublicController(),
};