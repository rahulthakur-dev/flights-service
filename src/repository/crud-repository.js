const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({ where: { id } });
        if (!response) {
            throw new AppError('Not able to found resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError('Not able to found resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError('Not able to found resource', StatusCodes.NOT_FOUND);
        }
        await response.update(data);
        return response; 
    }
}

module.exports = CrudRepository;