'use strict';

import UserRepository from './user-repository';
import BinanceRepository from './binance-repository';

module.exports = {
    userRepository: new UserRepository(),
    binanceRepository: new BinanceRepository(),
};