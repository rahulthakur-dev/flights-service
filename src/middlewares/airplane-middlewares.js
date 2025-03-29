const { StatusCodes } =  require("http-status-codes");
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Model Number is required';
        ErrorResponse.error = {explanation: 'Model Number is not found in the incoming request'};
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}