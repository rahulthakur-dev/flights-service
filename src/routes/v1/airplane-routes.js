const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneService } = require('../../services');
const { AirplaneRepository } = require('../../repository');
const router = express.Router();

const airplaneRepository = new AirplaneRepository();
const airplaneService = new AirplaneService(airplaneRepository);
const airplaneController = new AirplaneController(airplaneService);


router.post('/',airplaneController.createAirplane);


module.exports = router;