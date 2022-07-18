const express = require('express')
const places = require('../controllers/places')
const router = express.Router()

const { randomPlaceComplete, chooseRegion, randomPlaceRegion } = require('../controllers/places')
const { placesDetails, geoDetails, geoTourist } = require('../controllers/placesDetails')

// router.get('/', home)
router.get('/randomPlaceComplete', randomPlaceComplete)
router.get('/chooseRegion', chooseRegion)
router.get('/randomPlaceRegion/:region', randomPlaceRegion)
router.get('/places/:location', placesDetails)
router.get('/geo/:location', geoDetails)
router.get('/tourist/:location', geoTourist)



module.exports = router;