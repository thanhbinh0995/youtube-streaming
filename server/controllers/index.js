'use strict';

import UserController from './user-controller';
import BinanceController from './binance-controller';

module.exports = {
    userController: new UserController(),
    binanceController: new BinanceController(),
};