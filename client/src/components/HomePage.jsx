import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, useHistory} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:5000"

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send get request to backend to generate random location
            let location = await axios.get(`${URL}/randomPlaceComplete`)
            console.log(location)

            //await axios.get(`/places?location=${location.data}`)
            //await axios.get(`${URL}/places/${location.data}`)

            // Navigate to a new page, and pass in a prop to hold the location data
            navigate(`/places/${location.data}`, {state : `${location.data}`})

        } catch (error) {
            console.log(error)
        }
    }

    const handleRegion = (e) => {

        e.preventDefault();
        
        try {
            const region = e.target.textContent
            console.log(region)
            navigate(`/region/${region}`, { state : `${region}`})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Generate a Random Location!</button>
            <div>
                <ul>
                <button id="north-america" onClick={handleRegion}>North America</button>
                <button onClick={handleRegion}>South America</button>
                <button onClick={handleRegion}>Europe</button>
                <button onClick={handleRegion}>Asia</button>
                <button onClick={handleRegion}>Oceania</button>
                <button onClick={handleRegion}>Africa</button>
                </ul>
            </div>
        </div>
        
    )
}

export default HomePage
