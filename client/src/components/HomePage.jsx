import React from 'react'
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

    const handleRegion = async (e) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Generate a Random Location!</button>
            <div>
                <ul>
                <button>North America</button>
                <button>South America</button>
                <button>Europe</button>
                <button>Asia</button>
                <button>Oceania</button>
                <button>Africa</button>
                </ul>
            </div>
        </div>
        
    )
}

export default HomePage
