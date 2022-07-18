import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


const LocationDetails = () => {
    const navigate = useNavigate();

    const [photoLink, setPhotoLink] = useState('')
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([])

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
        // setLoading(true)
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
                    // setLoading(false)
                })
                .catch((err) => console.log(err))
            // const photoBackground = await axios.get(`${URL}/places/${state}`).then((result) => console.log(result)).catch((err) => console.log(err))

            //setPhotoLink(photoBackground)
            console.log(photoLink)

        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }

    const fetchGeoHotels = async () => {
        try {
            setLoading(true)
            const geoHotels = await axios.get(`${URL}/geo/${state}`)
                .then(function (result) {
                    console.log(result.data)
                    console.log("before setState", hotels)
                    setHotels(result.data)
                    // console.log(hotels)
                    console.log("after setState", hotels)
                    setLoading(false) // Set loading bar to false
                })
                .catch((err) => {console.log(err)})
        } catch (error) {
            console.log(error)
        } 
    }

    // Set empty dependency array 
    // So the effect will only run once the page loads
    useEffect(() => {
        //setLoading(true)
        console.log(loading)
        fetchDetails()
        
        console.log(loading)
        // fetchYelp()
        fetchGeoHotels()
        window.scrollTo(0, 0)
        // setLoading(false)
    }, [])

    // Since setState is an async function, we need to use another useEffect to access the value
    useEffect(() => {
        console.log("after second useEffect photoLink", photoLink)
        //setLoading(false)
    }, [photoLink])
    
    useEffect(() => {
        console.log("after second useEffect", hotels)
    }, [hotels])

    useEffect(() => {
        console.log("after second useEffect isLoading", loading)
    }, [loading])

    let bgStyle = {
        backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),' + "url(" + photoLink + ")",
    }
    console.log("hotels?? ", hotels)
    function displayHotels () {
        console.log("displayhotels", hotels)
        console.log(hotels[0].properties.datasource)
        const hotelList = hotels.map((hotel) => (
            <ListGroup.Item key={hotel.properties.name}
            as="li"
            className="d-flex justify-content-between align-items-start"
             >
            <div className="ms-2 me-auto">
            <div className="fw-bold">{hotel.properties.name}</div>
                {hotel.properties.housenumber} {hotel.properties.street}, {hotel.properties.city}, {hotel.properties.state} {hotel.properties.postcode}
            </div>
            <a href={hotel.properties.datasource.raw.website}>
                CLICK ME!
                {/* <Badge bg="primary" pill>
                    More...
                </Badge> */}
            </a>
            
        </ListGroup.Item>
        ))
        console.log(hotelList)
        return hotelList
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
                        {/* {loading && (
                            <div className="location-welcome">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        {!loading && (
                            <div className="location-welcome">
                                <h1>{city}</h1>
                                <h2>{country}</h2>
                            </div>
                        )} */}
                        <div className="location-welcome">
                            <h1>{city}</h1>
                            <h2>{country}</h2>
                        </div>
                        <div className="col text-center">
                            <Button variant="primary"  onClick={() => navigate(-1)}>Go Back</Button>
                        </div>
                    </div>
                </div>
                {/* <img src={photoLink}></img> */}
            </div>
            <div className="container">
            
            <div className="narrow">
                <h1 className="home">About {location}</h1>
            </div>
            <Card style={{ width: '36rem' }}>

                <Card.Header>Popular Hotels</Card.Header>

                {!loading ? (
                    <ListGroup as="ol" numbered>
                        {displayHotels()}
                    </ListGroup>
                ) : (
                    <div className="center-spinner">
                        <Spinner animation="border" role="status" border="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </Card>

            <Card style={{ width: '36rem' }}>
                <Card.Header>Restaurants Nearby</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{padding: 0}}>
                        <div className="card-horizontal">
                            <Row>
                                <Col>
                                    {/* <div class="img-square-wrapper"> */}
                                        <img className="float-left" style={{ maxWidth: '8rem' }}src='https://s3-media2.fl.yelpcdn.com/bphoto/iWV-RGF0V_feXhgpboMTIg/o.jpg'></img>
                                    {/* </div> */}
                                </Col>
                                <Col>
                                    <div className="section">
                                        <h3>Hi</h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Card>

            
            </div>
        </div>
    )
}

export default LocationDetails
