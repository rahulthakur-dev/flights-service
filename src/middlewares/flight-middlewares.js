const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const validateCreateRequest = (req, res, next) => {
    const requiredFields = [
        'flightNumber',
        'airplaneId',
        'departureAirportId',
        'arrivalAirportId',
        'arrivalTime',
        'departureTime',
        'price',
        'totalSeats'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        ErrorResponse.message = `Invalid request body. Missing required fields: ${missingFields.join(', ')}`;
        ErrorResponse.error = new AppError([`Missing fields: ${missingFields.join(', ')}`], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

const updateRemainingSeats = async (req, res, next) => {
    try {
        const { flightId } = req.params;
        const { seats, dec } = req.body;

        if (!flightId || seats === undefined || dec === undefined) {
            ErrorResponse.message = 'Invalid request body. Missing required fields: flightId, seats, or dec';
            ErrorResponse.error = new AppError(['Missing required fields: flightId, seats, or dec'], StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        // Pass validation, proceed to the next middleware or service
        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = {
    validateCreateRequest,
    updateRemainingSeats
};