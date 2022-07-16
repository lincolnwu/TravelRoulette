import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


const LocationDetails = () => {
    const navigate = useNavigate();

    const [photoLink, setPhotoLink] = useState('')
    const [loading, setLoading] = useState(false)

    // Recieve state passed from navigate
    // Link: https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const { state } = useLocation();
    let location = state
    console.log("location page received from button: ", location)
    // console.log(photo)

    let locationSplit = location.split(', ')
    let city = locationSplit[0]
    let country = locationSplit[1]

    const URL = "http://localhost:5000"
    // const GoogleImages = require('google-images');
    // const client = new GoogleImages('15fc64be48a4499aa', 'API KEY');
    
    // Make call to backend
    const fetchDetails = async () => {
        try {
            // const photoBackground = axios.get(`${URL}/places/${state}`).then((res) => setPhotoLink(res.data.large2x)).catch((err) => console.log(err))
            const photoBackground = await axios.get(`${URL}/places/${state}`)
                .then(function (result) {
                    let numPhotos = result.data.length
                    let photoNumber = 0
                    if (numPhotos > 0 ) {
                        photoNumber = getRandomInt(3)
                    }
                    //console.log(result.data.length)
                    setPhotoLink(result.data[photoNumber].largeImageURL)
                }).catch((err) => console.log(err))
            // const photoBackground = await axios.get(`${URL}/places/${state}`).then((result) => console.log(result)).catch((err) => console.log(err))

            //setPhotoLink(photoBackground)
            console.log(photoLink)

        } catch (error) {
            console.log(error)
        }
    }

    // Set empty dependency array 
    // So the effect will only run once the page loads
    useEffect(() => {
        setLoading(true)
        fetchDetails()
        window.scrollTo(0, 0)
        setLoading(false)
    }, [])

    let bgStyle = {
        backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),' + "url(" + photoLink + ")",
    }
    
    // useEffect(() => {
    //     setTimeout(function () {
    //         console.log("Delayed for 3 second.");
    //         fetchDetails()
    //         setLoading(false);
    //       }, 3000)
        
    // }, [])

    
    
    
    
    return (
        <div>
            <div className="location-bg" style={bgStyle} >
                <div className="container">
                    
                    <div>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                             <div className="location-welcome">
                                <h1>{city}</h1>
                                <h2>{country}</h2>
                            </div>
                        )}
                        {/* <div className="location-welcome">
                            <h1>{city}</h1>
                            <h2>{country}</h2>
                        </div> */}
                        <div className="col text-center">
                            <Button variant="primary"  onClick={() => navigate(-1)}>Go Back</Button>
                        </div>
                    </div>
                </div>
                {/* <img src={photoLink}></img> */}
            </div>
        </div>
    )
}

export default LocationDetails
