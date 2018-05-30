'use strict';

import {User} from '../models/index';
import BaseRepository from './base-repository';

export default class BinanceRepository extends BaseRepository {

    constructor() {
        super(User);
    }
    
}
