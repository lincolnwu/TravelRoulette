import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";


const LocationDetails = () => {
    const navigate = useNavigate();

    // Recieve state passed from navigate
    // Link: https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const { state } = useLocation();
    let location = state
    console.log(location)
    
    
    return (
        <div>
            <h1>Location details here</h1>
            <h2>Welcome to {location} ! </h2>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )
}

export default LocationDetails
