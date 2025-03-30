const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

class AirportController {
    constructor(airportService) {
        this.airportService = airportService;
    }
    
    /**
     * POST : /airports 
     * req-body {name: 'JFK', location: 'New York'}
     */
    createAirport = async(req, res) =>  {
        try {
            const airport = await this.airportService.createAirport({
                name: req.body.name,
                code: req.body.code,
                address: req.body.address,
                cityId: req.body.cityId,
            });
            SuccessResponse.data = airport;
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

    getAirports = async(req, res) => {
        try {
            const airports = await this.airportService.getAirports();
            SuccessResponse.data = airports;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }

    getAirport = async(req, res) => {
        try {
            const airport = await this.airportService.getAirport(req.params.id);
            SuccessResponse.data = airport;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }

    destroyAirport = async(req, res) => {
        try {
            const airport = await this.airportService.destroyAirport(req.params.id);
            SuccessResponse.data = airport;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }

    updateAirport = async(req, res) => {
        try {
            const airport = await this.airportService.updateAirport(req.params.id, req.body);
            SuccessResponse.data = airport;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode)
                .json(ErrorResponse);
        }
    }
}

module.exports = AirportController;
