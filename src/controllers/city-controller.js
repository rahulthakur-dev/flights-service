const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }

    /**
     * POST : /cities 
     * req-body {name: 'New York'}
     */
    createCity = async (req, res) => {
        try {
            const city = await this.cityService.createCity({
                name: req.body.name
            });
            SuccessResponse.data = city;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }

    getCities = async (req, res) => {
        try {
            const cities = await this.cityService.getCities();
            SuccessResponse.data = cities;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }

    getCity = async (req, res) => {
        try {
            const city = await this.cityService.getCity(req.params.id);
            SuccessResponse.data = city;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }

    destroyCity = async (req, res) => {
        try {
            const city = await this.cityService.destroyCity(req.params.id);
            SuccessResponse.data = city;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }

    updateCity = async (req, res) => {
        try {
            const city = await this.cityService.updateCity(req.params.id, req.body);
            SuccessResponse.data = city;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        } catch (error) {
            ErrorResponse.error = error;
            return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }
}

module.exports = CityController;
