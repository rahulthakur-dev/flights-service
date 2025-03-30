const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class AirportService {
    constructor(airportRepository) {
        this.airportRepository = airportRepository;
    }

    async createAirport(data) {
        try {
            return await this.airportRepository.create(data);
        } catch (error) { 
            if (error.name === 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroyAirport(id) {
        try {
            return await this.airportRepository.destroy(id);
        } catch (error) {
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot delete Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirport(id) {
        try {
            return await this.airportRepository.get(id);
        } catch (error) {
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot get Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirports() {
        try {
            return await this.airportRepository.getAll();
        } catch (error) {
            throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAirport(id, data) {
        try {
            return await this.airportRepository.update(id, data);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot update Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = AirportService;
