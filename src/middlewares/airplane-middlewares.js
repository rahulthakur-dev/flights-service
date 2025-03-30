const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    const { name, code, address, cityId } = req.body;

    if (!name || !code || !cityId) {
        ErrorResponse.message = 'Invalid request';
        ErrorResponse.error = new AppError(
            ['Name, code, address, and cityId are required fields'],
            StatusCodes.BAD_REQUEST
        );
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
};