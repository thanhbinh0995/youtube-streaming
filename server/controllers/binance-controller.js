'use strict';

import binance from 'node-binance-api';
binance.options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.SECRET_KEY,
    useServerTime: true,
    test: true
});
export default class BinanceController {

    getLatestPrice = async (coin, type) => {
        const nameCoin = coin + type;
        const ticker_test = binance.prices(nameCoin, (error, ticker) => {
            console.log("ticker test")
            console.log(ticker);
            for(let key in ticker) {
                if (key === coin) {
                    console.log(`Price of ${coin}: `, ticker.key);
                }
            }

        });
        console.log("ticker")
        const ticker = await binance.prices(nameCoin);
        console.log(ticker);
        return ticker;
    };

}