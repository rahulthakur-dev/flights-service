const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportService } = require('../../services');
const { AirportRepository } = require('../../repository');
const { AirportMiddlewares } = require('../../middlewares');

const router = express.Router();

const airportRepository = new AirportRepository();
const airportService = new AirportService(airportRepository);
const airportController = new AirportController(airportService);

router.post('/',
    
    airportController.createAirport
);

router.get('/', airportController.getAirports);
router.get('/:id', airportController.getAirport);
router.delete('/:id', airportController.destroyAirport);
router.patch('/:id', airportController.updateAirport);

module.exports = router;
