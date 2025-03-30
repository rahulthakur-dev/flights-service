const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { isValidTimeRange } = require('../utils/helpers');

class AirplaneService {
    constructor(airplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    async createFlight(data) {
        try {
            if (!isValidTimeRange(data.departureTime, data.arrivalTime)) {
                throw new AppError(
                    'Departure time cannot be later than arrival time',
                    StatusCodes.BAD_REQUEST
                );
            }

            return await this.airplaneRepository.create(data);
        } catch (error) { 
            if (error.name === 'SequelizeValidationError') {
                let explanation = error.errors.map(err => err.message);
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }

            throw new AppError(
                error.message || 'Cannot create a new Flight object', 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = AirplaneService;