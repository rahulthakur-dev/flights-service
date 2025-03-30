const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }

    
    async createCity(data) {
        try {
            return await this.cityRepository.create(data);
        } catch (error) { 
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroyCity(id) {
        try {
            return await this.cityRepository.destroy(id);
        } catch (error) {
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('City not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot delete a City object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCity(id) {
        try {
            return await this.cityRepository.get(id);
        } catch (error) {
            if(error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError('City not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot get City object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCities() {
        try {
            return await this.cityRepository.getAll();
        } catch (error) {
            throw new AppError('Cannot fetch data of all the cities', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCity(id, data) {
        try {
            return await this.cityRepository.update(id, data);
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
                throw new AppError('City not found', StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot update City object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }


}

module.exports = CityService;