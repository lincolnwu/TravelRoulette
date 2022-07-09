
const home = (req, res) => {
    res.send("hello")
}

// Controller to handle a complete random place from the homepage
const randomPlaceComplete = (req, res) => {
    res.send("get random place")
}

// Handle choosing a region
const chooseRegion = (req, res) => {

}

// Handle random location for a region
const randomPlaceRegion = (req, res) => {
    
}



module.exports = {
    home,
    randomPlaceComplete,
    chooseRegion,
    randomPlaceRegion
};