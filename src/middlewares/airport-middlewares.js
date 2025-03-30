const { StatusCodes } =  require("http-status-codes");
const { ErrorResponse } = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Model Number is required';
        ErrorResponse.error = new AppError(['Model number not found in incoming request'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}