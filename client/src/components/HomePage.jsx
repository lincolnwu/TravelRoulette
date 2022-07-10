import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, useHistory} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const URL = "http://localhost:5000"
    
        try {
            // Send get request to backend to generate random location
            let location = await axios.get(`${URL}/randomPlaceComplete`)
            //window.location.href = `http://localhost:5000/places/${location.data}`
            console.log(location)

            //await axios.get(`/places?location=${location.data}`)
            //await axios.get(`${URL}/places/${location.data}`)
            
            // Navigate to a new page, and pass in a prop to hold the location data
            navigate(`/places/${location.data}`, {state : `${location.data}`})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Generate a Random Location!</button>
            
        </div>
    )
}

export default HomePage
