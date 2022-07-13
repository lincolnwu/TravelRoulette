// Redirect after choosing a random location
// app.get('/places/:location')
const axios = require('axios')

require('dotenv').config();
const API_KEY = process.env.YELP_API_KEY

ENDPOINT = "https://api.yelp.com/v3/businesses/search"



const placesDetails = async (req, res) => {
    console.log("/places endpoint worked")
    console.log(req.params.location)
    //res.send("/places endpoint worked")

    let config = {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        },
        params: {
            location: req.params.location,
            limit: 3
        }
    }

    // Make API call to Yelp
    await axios.get(ENDPOINT, config).then((response) => {
        console.log(response.data)
    }).catch((error) => {console.log(error)})

}

module.exports = {
    placesDetails
}