const locationJSON = require('../locations.json')

// For a chosen region
const getRandomRegionKey = (locationJSON) => {
    let regionKeys = Object.keys(locationJSON)
    let randomRegionIndex = Math.floor(Math.random() * regionKeys.length)
    let randomRegionKey = regionKeys[randomRegionIndex]
    return randomRegionKey
}
// For a chosen region
const getRandomCountry = (randomRegionKey) => {
    let randomCountryKeys = Object.keys(locationJSON[randomRegionKey])
    let randomCountryIndex = Math.floor(Math.random() * randomCountryKeys.length)
    let randomCountryKey = randomCountryKeys[randomCountryIndex]
    return randomCountryKey
}
// For a chosen city
const getRandomCity = (randomRegionKey, randomCountryKey) => {
    let cities = locationJSON[randomRegionKey][randomCountryKey]
    let randomCityKeys = Object.keys(cities)
    let randomCityIndex = Math.floor(Math.random() * randomCityKeys.length)
    let randomCityKey = randomCityKeys[randomCityIndex]
    return randomCityKey
}
// For a completely random location (homepage)
const completeRandom = (locationJSON) => {
    let randomRegion = getRandomRegionKey(locationJSON)
    let randomCountry = getRandomCountry(randomRegion)
    let randomCity = getRandomCity(randomRegion, randomCountry)
    return randomCity
}

// For a random city within a chosen region
const randomWithRegion = (locationJSON, region) => {
    let countries = locationJSON[region]
    let randomCountryKeys = Object.keys(countries)
    let randomCountryIndex = Math.floor(Math.random() * randomCountryKeys.length)
    let randomCountryKey = randomCountryKeys[randomCountryIndex]

    let cities = locationJSON[region][randomCountryKey]
    let randomCityKeys = Object.keys(cities)
    let randomCityIndex = Math.floor(Math.random() * randomCityKeys.length)
    let randomCityKey = randomCityKeys[randomCityIndex]

    return randomCityKey
}



// Controller to handle a complete random place from the homepage
// app.get('/randomPlaceComplete')
const randomPlaceComplete = (req, res) => {
    let randomLocation = completeRandom(locationJSON)
    res.send(randomLocation)
}

// Handle choosing a region
// app.get('/chooseRegion')
const chooseRegion = (req, res) => {

}

// Handle random location for a region
// app.get('/randomPlaceRegion/:region')
const randomPlaceRegion = (req, res) => {
    let region = req.params.region
    // console.log(region)
    res.send(region)
}

// Redirect after choosing a random location
// app.get('/places/:location')
const placesDetails = (req, res) => {
    console.log("/places endpoint worked")
    console.log(req.params.location)
    //res.send("/places endpoint worked")

}



module.exports = {
    randomPlaceComplete,
    chooseRegion,
    randomPlaceRegion,
    placesDetails
};