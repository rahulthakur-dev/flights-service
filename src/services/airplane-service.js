const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class AirplaneService {
    constructor(airplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    async createAirplane(data) {
        try {
            return await this.airplaneRepository.create(data);
        } catch (error) { 
            if (error.name === 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroyAirplane(id) {
        try {
            return await this.airplaneRepository.destroy(id);
        } catch (error) {
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot delete a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplane(id) {
        try {
            return await this.airplaneRepository.get(id);
        } catch (error) {
            if(error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot get Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplanes() {
        try {
            return await this.airplaneRepository.getAll();
        } catch (error) {
            throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAirplane(id, data) {
        try {
            return await this.airplaneRepository.update(id, data);
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot update Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = AirplaneService;