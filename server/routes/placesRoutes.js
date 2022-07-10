const express = require('express')
const places = require('../controllers/places')
const router = express.Router()

const { randomPlaceComplete, chooseRegion, randomPlaceRegion, placesDetails} = require('../controllers/places')

// router.get('/', home)
router.get('/randomPlaceComplete', randomPlaceComplete)
router.get('/chooseRegion', chooseRegion)
router.get('/randomPlaceRegion', randomPlaceRegion)
router.get('/places/:location', placesDetails)

module.exports = router;