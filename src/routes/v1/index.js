const router = require('express').Router();


router.use('/airplanes', require('./airplane-routes'));
router.use('/cities', require('./city-routes'));

module.exports = router;