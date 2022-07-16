// Redirect after choosing a random location
// app.get('/places/:location')
const axios = require('axios')

require('dotenv').config();
const API_KEY = process.env.PEXELS_API_KEY
const PIXABAY_KEY = process.env.PIXABAY_API_KEY


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



const placesDetails = async (req, res) => {
    console.log("/places endpoint worked", req.params.location)
    //console.log(req.params.location)
    const queryLocation = req.params.location
    console.log("Query:", queryLocation)

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

module.exports = {
    placesDetails
}