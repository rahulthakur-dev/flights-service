const express = require('express');
const { CityController } = require('../../controllers');
const { CityService } = require('../../services');
const { CityRepository } = require('../../repository');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

const cityRepository = new CityRepository();
const cityService = new CityService(cityRepository);
const cityController = new CityController(cityService);

router.post('/',
    CityMiddlewares.validateCreateRequest,
    cityController.createCity
);

router.get('/', cityController.getCities);
router.get('/:id', cityController.getCity);
router.delete('/:id', cityController.destroyCity);
router.patch('/:id', cityController.updateCity);

module.exports = router;
