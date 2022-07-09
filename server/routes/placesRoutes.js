const express = require('express')
const router = express.Router()

const { home, randomPlaceComplete, chooseRegion, randomPlaceRegion} = require('../controllers/places')

router.get('/', home)
router.get('/randomPlaceComplete', randomPlaceComplete)
router.get('/chooseRegion', chooseRegion)
router.get('/randomPlaceRegion', randomPlaceRegion)

module.exports = router;