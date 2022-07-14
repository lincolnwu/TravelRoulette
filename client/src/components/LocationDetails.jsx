import React from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";


const LocationDetails = () => {
    const navigate = useNavigate();

    // Recieve state passed from navigate
    // Link: https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const { state } = useLocation();
    let location = state
    console.log(location)

    const URL = "http://localhost:5000"
    // const GoogleImages = require('google-images');
    // const client = new GoogleImages('15fc64be48a4499aa', 'API KEY');
    
    // Make call to backend
    const fetchDetails =  () => {
        
        try {
            axios.get(`${URL}/places/${state}`).then((res) => console.log(res)).catch((err) => console.log(err))
            //console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    // fetchDetails()
    
    
    return (
        <div>
            <div className="location-welcome">
                <h1>Location details here</h1>
                <h2>Welcome to {location} ! </h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
            
            
        </div>
    )
}

export default LocationDetails
