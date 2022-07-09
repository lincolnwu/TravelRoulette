import React from 'react'
import axios from 'axios'

const Location = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = "http://localhost:5000"
        try {
            // Send post request to backend to generate random location
            let location = await axios.get(`${URL}/randomPlaceComplete`)
            console.log(location)
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

export default Location
