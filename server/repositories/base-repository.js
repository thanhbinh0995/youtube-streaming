'use strict';

export default class BaseRepository {

    constructor(model) {
        this._model = model;
    }

    async getAll(options) {
        return await this._model.findAll(options);
    }

    async get(options) {
        return await this._model.findOne(options);
    }

    async create(data) {
        return await this._model.create(data);
    }

    async update(data, options) {
        return await this._model.update(data, options);
    }

    async delete(options) {
        return await this._model.destroy(options);
    }

    async bulkCreate(data, options) {
        return await this._model.bulkCreate(data, options);
    }

    async count(options) {
        return await this._model.count(options);
    }

}