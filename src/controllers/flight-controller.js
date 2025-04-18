const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

class FlightController {
    constructor(flightService) {
        this.flightService = flightService;
    }
    /**
     * POST : /flights
     * req-body {
     *   flightNumber: 'UK 808',
     *   airplaneId: 'a380',
     *   departureAirportId: 12,
     *   arrivalAirportId: 11,
     *   arrivalTime: '11:10:00',
     *   departureTime: '9:10:00',
     *   price: 2000,
     *   boardingGate: '12A',
     *   totalSeats: 120
     * }
     */
    createFlight = async (req, res) => {
        try {
            const flight = await this.flightService.createFlight({
                flightNumber: req.body.flightNumber,
                airplaneId: req.body.airplaneId,
                departureAirportId: req.body.departureAirportId,
                arrivalAirportId: req.body.arrivalAirportId,
                arrivalTime: req.body.arrivalTime,
                departureTime: req.body.departureTime,
                price: req.body.price,
                boardingGate: req.body.boardingGate,
                totalSeats: req.body.totalSeats,
            });
            SuccessResponse.data = flight;
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

    /**
     * GET : /flights
     * query params : trips=12-11
     */
    getAllFlights = async (req, res) => {
        try {
            const flights = await this.flightService.getAllFlights(req.query);
            SuccessResponse.data = flights;
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

    getFlight = async (req, res) => {
        try {
            const flight = await this.flightService.getFlight(req.params.id);
            SuccessResponse.data = flight;
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


    updateRemainingSeats = async (req, res) => {
        try {
            const flight = await this.flightService.updateRemainingSeats({
                flightId: req.params.flightId,
                seats: req.body.seats,
                dec: req.body.dec
            });
            SuccessResponse.data = flight;
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

module.exports = FlightController;