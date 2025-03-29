const router = require('express').Router();


router.use('/airplanes', require('./airplane-routes'));

module.exports = router;