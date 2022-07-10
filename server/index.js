const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json());


require('dotenv').config()
const api_key = process.env.GEOAPIFY_API_KEY;

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started for port: " + PORT))

const placesRoutes = require("./routes/placesRoutes")
app.use('/', placesRoutes)

// app.get('/places', (req, res) => {
//     res.send("places worked here?")
// })