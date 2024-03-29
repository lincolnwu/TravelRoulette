// Redirect after choosing a random location
// app.get('/places/:location')
const axios = require('axios')

require('dotenv').config();
const YELP_KEY = process.env.YELP_API_KEY
const PIXABAY_KEY = process.env.PIXABAY_API_KEY
const GEO_KEY = process.env.GEOAPIFY_API_KEY


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const placesDetails = async (req, res) => {
    //console.log("/places endpoint worked", req.params.location)
    //console.log(req.params.location)
    const queryLocation = req.params.location
    //console.log("Query:", queryLocation)

    const ENDPOINT2 = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${queryLocation}&orientation=horizontal&min_width=1920&min_height=1080&image_type=photo`
    await axios.get(ENDPOINT2)
    // .then((result) => res.send(result.data.hits[getRandomInt(5)]))
    .then((result) => res.send(result.data.hits))
    .catch(err => console.log(err))


    // axios.get(ENDPOINT, config)
    //     // .then((photos) => console.log(photos.data.photos[0].src))
    //     .then((photos) => res.send(photos.data.photos[0].src))
    //     .catch((error) => console.log(error))

}

// const yelpDetails = async (req, res) => {
//     console.log("yelp got the location:", req.params.location)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${YELP_KEY}`
//         },
//         params: {
//             term: 'restaurant',
//             location: req.params.location,
//             radius: 40000,
//             limit: 1,
//             sort_by: 'rating'
//         }
//     }

//     const YELP_URL = "https://api.yelp.com/v3/businesses/search"
//     axios.get(YELP_URL, config)
//         .then(res => console.log(res.data.businesses))
//         .catch(err => console.log(err))
// }

const geoDetails = async (req, res) => {
    //console.log("location for geoapi: ", req.params.location)
    const queryLocation = req.params.location
    const ENDPOINT3 = `https://api.geoapify.com/v1/geocode/search?text=${queryLocation}&format=json&apiKey=${GEO_KEY}`
    await axios.get(ENDPOINT3)
    .then(function (response) {
        placeID = response.data.results[0].place_id
        //console.log("received: ", placeID)
        //console.log(response.data.results[0].place_id)
        // Return data from this axios call
        return placeID
    })
    .then(async (placeID) => {
        //console.log("second one got: ", placeID)
        await axios.get(`https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=place:${placeID}&limit=400&apiKey=${GEO_KEY}`)
        .then(function (response) {
            res.send(response.data.features)
            //console.log(response.data.features)
        })
    })
    .catch(err => console.log(err))

}

const geoTourist = async (req, res) => {
    //console.log("location for tourist attractions: ", req.params.location)
    const queryLocation = req.params.location
    const getID = `https://api.geoapify.com/v1/geocode/search?text=${queryLocation}&format=json&apiKey=${GEO_KEY}`
    await axios.get(getID)
    .then(function (response) {
        placeID = response.data.results[0].place_id
        //console.log("tourist ID received: ", placeID)
        //console.log(response.data.results[0].place_id)
        // Return data from this axios call
        return placeID
    })
    .then(async (placeID) => {
        const ENDPOINT4 =  `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:${placeID}&limit=400&apiKey=${GEO_KEY}`
        await axios.get(ENDPOINT4)
        .then(function (response) {
            res.send(response.data.features)
            //console.log("did tourism work?", response.data.features)
            //console.log("tourism worked ")
        })
    })
    
}

const getWikiImg = async (req, res) => {
    //console.log("wiki data for img", req.params.location)
    const queryLocation = req.params.location
    const ENDPOINT5 = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&origin=*&titles=${queryLocation}`
    await axios.get(ENDPOINT5)
        .then(function (response) {
            //console.log(response)
        })
}

const getWikiSummary = (req, res) => {
    const queryLocation = req.params.location
    const urlEncoded = encodeURI(queryLocation)
    const ENDPOINT6 = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&indexpageids&explaintext&redirects=1&titles=${urlEncoded}`
    axios.get(ENDPOINT6)
    .then(function (response) {
        //console.log(response.data.query)
        const pageID = response.data.query.pageids[0]
        //console.log(pageID)
        let raw = response.data.query.pages[pageID].extract
        if (raw) {
            let text = response.data.query.pages[pageID].extract.split("\n")
            if (text.length >= 1) {
                let final = text[0].split(/\.(?!\s)/g)
                //console.log(final.slice(0, 5).join("."))
                res.send(final.slice(0, 5).join("."))
            }
            else {
                res.send(response.data.query.pages[pageID].extract)
            }
        } else {
            res.send("")
        }
        //console.log(response.data.query.pages[pageID].extract)
        //res.send(response.data.query.pages[pageID].extract)
    })
}

module.exports = {
    placesDetails,
    geoDetails,
    geoTourist,
    getWikiImg,
    getWikiSummary
}