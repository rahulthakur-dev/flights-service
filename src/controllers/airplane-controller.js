const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


class AirplaneController {
    constructor(airplaneService) {
        this.airplaneService = airplaneService;
    }
    
    /**
     * POST : /airplanes 
     * req-body {modelNumber: 'airbus', capacity: 100}
     */
    createAirplane = async(req, res) =>  {
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
            ErrorResponse.error = error;
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }
}

module.exports = AirplaneController;