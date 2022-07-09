const express = require('express')
const app = express()

require('dotenv').config()
const api_key = process.env.GEOAPIFY_API_KEY;

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started for port: " + PORT))


let locationJSON = require('./locations.json')

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
    //console.log("Number of countries:", randomCountryKeys.length)
    let randomCountryIndex = Math.floor(Math.random() * randomCountryKeys.length)
    let randomCountryKey = randomCountryKeys[randomCountryIndex]
    return randomCountryKey
}

// For a chosen city
const getRandomCity = (randomRegionKey, randomCountryKey) => {
    // console.log(randomRegionKey)
    
    // console.log(randomCountryKey)
    let cities = locationJSON[randomRegionKey][randomCountryKey]
    //console.log(locationJSON[randomRegionKey][randomCountryKey])

    let randomCityKeys = Object.keys(cities)
    //console.log(randomCityKeys)
    
    let randomCityIndex = Math.floor(Math.random() * randomCityKeys.length)
    //console.log(randomCityIndex)

    let randomCityKey = randomCityKeys[randomCityIndex]
    //console.log(randomCityKey)

    //console.log(randomCountryKey.randomCityKey)
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
    console.log(countries)
    let randomCountryKeys = Object.keys(countries)
    console.log(randomCountryKeys)
    let randomCountryIndex = Math.floor(Math.random() * randomCountryKeys.length)
    console.log(randomCountryIndex)
    let randomCountryKey = randomCountryKeys[randomCountryIndex]
    console.log("Random country:", randomCountryKey)

    let cities = locationJSON[region][randomCountryKey]
    console.log(cities)
    let randomCityKeys = Object.keys(cities)
    let randomCityIndex = Math.floor(Math.random() * randomCityKeys.length)
    let randomCityKey = randomCityKeys[randomCityIndex]
    return randomCityKey
}

let completeRan = completeRandom(locationJSON)
console.log(completeRan)

let randomCountries = randomWithRegion(locationJSON, 'Asia')
console.log(randomCountries)
