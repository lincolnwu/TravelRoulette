import React from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

const RegionPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const URL = "http://localhost:5000"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Send the region that was chosen to backend
            const location = await axios.get(`${URL}/randomPlaceRegion/${state}`)
            console.log("location successfully received: ", location)
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Region Infomation Here</h1>
            <h2>Welcome to {state}</h2>
            <button onClick={handleSubmit}> Find a destination in {state}!</button>
            <button onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default RegionPage
