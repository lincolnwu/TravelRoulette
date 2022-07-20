import React from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import NA from '../assets/NorthAmerica.jpeg'
import SA from '../assets/SouthAmerica.jpeg'
import EU from '../assets/Europe.jpeg'
import AS from '../assets/Asia.jpeg'
import OC from '../assets/Oceania.jpeg'
import AF from '../assets/Africa.jpeg'
import Button from 'react-bootstrap/Button';


const RegionPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const URL = "http://3.82.189.184:5000"

    console.log("Region page received:", state)


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Send the region that was chosen to backend
            const location = await axios.get(`${URL}/randomPlaceRegion/${state}`)
            console.log("location successfully received: ", location.data)
            navigate(`/places/${location.data}`, {state : `${location.data}`})
            
        } catch (error) {
            
        }
    }

    let imgSrc = ""
    if (state === "North America") {
        imgSrc = NA
    }
    else if (state === "South America") {
        imgSrc = SA
    }
    else if (state === "Europe") {
        imgSrc = EU
    }
    else if (state === "Asia") {
        imgSrc = AS
    }
    else if (state === "Oceania") {
        imgSrc = OC
    }
    else if (state === "Africa") {
        imgSrc = AF
    }
    window.scrollTo(0, 0)
    console.log(imgSrc)

    let imgUrl = `url(${imgSrc})`

    let bgStyle = {
        backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),' + imgUrl,
    }

    return (
        <div>
            <div className="region-bg" style={bgStyle}>
                {/* <div className="container">
                    <h1>Region Infomation Here</h1>
                    <h2>Welcome to {state}</h2>
                    <img src={imgSrc}></img>
                    <button onClick={handleSubmit}> Find a destination in {state}!</button>
                    <button onClick={() => navigate("/")}>Go Back</button>
                </div> */}
                <div className="container">
                    <div className="region-welcome">
                        <h1>Welcome to {state}</h1>
                        <h2>Find your next destination</h2>
                    </div>
                    <div className="col text-center">
                        <Button variant="primary" onClick={handleSubmit}> Find a destination in {state}!</Button>
                    </div>
                    <br></br>
                    <div className="col text-center">
                        <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default RegionPage
