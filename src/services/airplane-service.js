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

    async deleteAirplane(id) {
        try {
            return await this.airplaneRepository.destroy(id);
        } catch (error) {
            throw error;
        }
    }

    async getAirplane(id) {
        try {
            return await this.airplaneRepository.get(id);
        } catch (error) {
            throw error;
        }
    }

    async getAllAirplanes() {
        try {
            return await this.airplaneRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    async updateAirplane(id, data) {
        try {
            return await this.airplaneRepository.update(id, data);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AirplaneService;