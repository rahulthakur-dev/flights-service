const router = require('express').Router();


router.use('/airplanes', require('./airplane-routes'));
router.use('/cities', require('./city-routes'));
router.use('/airports', require('./airport-routes'));

module.exports = router;