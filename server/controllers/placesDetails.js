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

    // let config = {
    //     headers: {
    //         Authorization: `Bearer ${API_KEY}`
    //     },
    //     params: {
    //         location: req.params.location,
    //         limit: 3
    //     }
    // }

    // // Make API call to Yelp
    // await axios.get(ENDPOINT, config).then((response) => {
    //     console.log(response.data)
    // }).catch((error) => {console.log(error)})
    
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
        params: {query: 'new york', locale: 'en_US', currency: 'USD'},
        headers: {
          'X-RapidAPI-Key': '022326fdaemshb97ce1657aeb582p1413bfjsn6e4a8dd63bbf',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}

module.exports = {
    placesDetails
}