const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


class AirplaneController {
    constructor(airplaneService) {
        this.airplaneService = airplaneService;
    }
    
    /**
     * POST : /airplanes 
     * req-body {modelNumber: 'airbus', capacity: 100}
     */
    async createAirplane(req, res) {
        try {
            const airplane = await this.airplaneService.createAirplane({
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity
            });
            SuccessResponse.data = airplane;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
        } catch (error) {
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }
}

module.exports = AirplaneController;