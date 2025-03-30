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

module.exports = {
    validateCreateRequest
};