const { StatusCodes } = require('http-status-codes');

class AirplaneController {
    constructor(airplaneService) {
        this.airplaneService = airplaneService;
    }
    
    /**
     * POST : /airplanes 
     * req-body {modelNumber: 'airbus', capacity: 100}
     */
    createAirplane =  async(req, res) =>  {
        try {
            const airplane = await this.airplaneService.createAirplane({
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity
            });
        
            return res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    message: 'Airplane created successfully',
                    data: airplane,
                    error: {}
                });
        } 
        catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: error.message,
                    data: {},
                    error: error
                });
        }
    }
}

module.exports = AirplaneController;