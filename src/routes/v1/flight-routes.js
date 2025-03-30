const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightService } = require('../../services');
const { FlightRepository } = require('../../repository');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

const flightRepository = new FlightRepository();
const flightService = new FlightService(flightRepository);
const flightController = new FlightController(flightService);

router.post('/',
    FlightMiddlewares.validateCreateRequest,
    flightController.createFlight
);


module.exports = router;
