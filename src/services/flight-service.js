const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { isValidTimeRange } = require('../utils/helpers');
const { Op } = require('sequelize');

class AirplaneService {
    constructor(flightRepository) {
        this.flightRepository = flightRepository;
    }

    async createFlight(data) {
        try {
            if (!isValidTimeRange(data.departureTime, data.arrivalTime)) {
                throw new AppError(
                    'Departure time cannot be later than arrival time',
                    StatusCodes.BAD_REQUEST
                );
            }

            return await this.flightRepository.create(data);
        } catch (error) { 
            if (error.name === 'SequelizeValidationError') {
                let explanation = error.errors.map(err => err.message);
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }

            throw new AppError(
                error.message || 'Cannot create a new Flight object', 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }


    async getAllFlights(query) {
        try {
            let customFilter = {};
            let sortFilter = [];
            if(query.trips){
                const [departureAirportId, arrivalAirportId] = query.trips.split('-');
                customFilter.departureAirportId = departureAirportId;
                customFilter.arrivalAirportId = arrivalAirportId;
                // TODO: Add validation for departure and arrival airport IDs should not be same 
            }
            if(query.price){
                const [minPrice, maxPrice] = query.price.split('-');
                customFilter.price = {
                    [Op.gte]: minPrice,
                    [Op.lte]: (maxPrice == undefined) ? 999999 : maxPrice
                };
            }
            if (query.travellers) {
                customFilter.totalSeats = {
                    [Op.gte]: query.travellers
                };
            }
            if (query.tripDate) {
                customFilter.departureTime = {
                    [Op.between]: [query.tripDate, `${query.tripDate} 23:59:00`]
                };
            }
            if (query.sort) {
                const params = query.sort.split(',');
                const sortFilters = params.map(param => param.split('_'));
                sortFilter = sortFilters
            }

            try{
                const flights = await this.flightRepository.getAllFlights(customFilter, sortFilter);
                return flights;
            }catch(error){
                throw new AppError(
                    'Cannot get all Flights',
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            return await this.flightRepository.getAllFlights(filter);
        } catch (error) {
            throw new AppError(
                error.message || 'Cannot get all Flights',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getFlight(id) {
        try {
            const flight = await this.flightRepository.get(id);

            return flight;
        }
        catch (error) {
            console.log(error);
            if(error.statusCode === StatusCodes.NOT_FOUND){
                throw new AppError('Flight not found',StatusCodes.NOT_FOUND);
            }
            throw new AppError('Cannot get Flight',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRemainingSeats( data) {
        try {
            const flight = await this.flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
            return flight;
        } catch (error) {
            throw new AppError('Cannot update Flight', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }



}

module.exports = AirplaneService;