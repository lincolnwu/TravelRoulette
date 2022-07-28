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
import Container from 'react-bootstrap/Container'


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


const LocationDetails = () => {
    const navigate = useNavigate();

    const [photoLink, setPhotoLink] = useState('')
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([])
    const [attractions, setAttractions] = useState([])
    const [imageLinks, setImageLinks] = useState([])
    const [touristLoading, setTouristLoading] = useState(true)
    const [description, setDescription] = useState("")

    // Recieve state passed from navigate
    // Link: https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const { state } = useLocation();
    let location = state
    //console.log("location page received from button: ", location)
    // console.log(photo)

    let locationSplit = location.split(', ')
    let city = locationSplit[0]
    let country = locationSplit[1]

    // const URL = "http://3.82.189.184:5000" AWS
    const URL = "http://localhost:5000"
    
    // Make call to backend for photo background
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
            //console.log(photoLink)

        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }

    const fetchGeoHotels = async () => {

        // Make sure the hotel has a website
        const checkHotel = (hotel) => {
            // let houseNumber = "housenumber" in hotel.properties
            // let street = "street" in hotel.properties
            let website = "website" in hotel.properties.datasource.raw
            // console.log(houseNumber || street)
            //console.log(houseNumber && website)
            return website
        }

        try {
            setLoading(true)
            const geoHotels = await axios.get(`${URL}/geo/${state}`)
                .then(function (result) {
                    //console.log(result.data)
                    //console.log("before setState", hotels)

                    // Filter out hotels with a website
                    const filteredHotels = result.data.filter(checkHotel)
                    const uniqueFilteredHotels = [... new Set(filteredHotels)]
                    //console.log("filtered hotels", uniqueFilteredHotels)
                    setHotels(filteredHotels)
                    //console.log(hotels)
                    //console.log("after setState", hotels)
                    setLoading(false) // Set loading bar to false
                })
                .catch((err) => {console.log(err)})
        } catch (error) {
            console.log(error)
        } 
    }

    const fetchTouristSpots = async () => {

        const checkTourist = (spot) => {
            let wikiImg = "wikipedia" in spot.properties.datasource.raw
            let name = "name" in spot.properties
            return (wikiImg && name)
        }

        const regularCheckTourist = (spot) => {
            let name = "name" in spot.properties
            return name
        }

        try {
            setTouristLoading(true)
            const geoTourist = await axios.get(`${URL}/tourist/${state}`)
                .then(function (result) {
                    //console.log("regular tourists", result.data)
                    const tourist = result.data.filter(regularCheckTourist)
                    // For wikipedia images
                    //const filteredTourist = result.data.filter(checkTourist)

                    // if (filteredTourist.length >= 4) {
                    //     setAttractions(filteredTourist)
                    //     // setUseImg(true)
                    // } else {
                    //   setAttractions(tourist)  
                    // //   setUseImg(false)
                    // }
                    
                    setAttractions(tourist) 

                    //console.log("regular tourists", result.data)
                    // console.log("filtered tourists", filteredTourist)

                    //console.log("attractions", attractions)
                    setTouristLoading(false)
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }


    // Set empty dependency array 
    // So the effect will only run once the page loads
    useEffect(() => {
        //setLoading(true)
        //console.log(loading)
        fetchDetails()
        
        //console.log(loading)
        // fetchYelp()
        fetchGeoHotels()

        fetchTouristSpots()
        displaySummary()
        window.scrollTo(0, 0)
        // setLoading(false)
        
    }, [])

    // Since setState is an async function, we need to use another useEffect to access the value
    useEffect(() => {
        //console.log("after second useEffect photoLink", photoLink)
        //setLoading(false)
    }, [photoLink])
    
    useEffect(() => {
        //console.log("after second useEffect", hotels)
    }, [hotels])

    useEffect(() => {
        //console.log("after second useEffect isLoading", loading)
    }, [loading])

    useEffect(() => {
    }, [touristLoading])

    let bgStyle = {
        backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),' + "url(" + photoLink + ")",
    }

    //console.log("hotels?? ", hotels)
    function displayHotels () {
        //console.log("displayhotels", hotels)
        //console.log(hotels[0].properties.datasource)
        const hotelList = hotels.slice(0, 5).map((hotel) => (
            <ListGroup.Item key={hotel.properties.name}
            as="li"
            className="d-flex justify-content-between align-items-start"
             >
            <div className="ms-2 me-auto">
            <div className="fw-bold">{hotel.properties.name}</div>
                {hotel.properties.address_line2}
                {/* {hotel.properties.housenumber} {hotel.properties.street}, {hotel.properties.city}, {hotel.properties.state} {hotel.properties.postcode} */}
            </div>
            <a href={hotel.properties.datasource.raw.website}>
                <Badge bg="primary" pill>
                    Book...
                </Badge>
            </a>
            
        </ListGroup.Item>
        ))
        //console.log(hotelList)
        return hotelList
    }

    const displayImgAttractions =  () => {

        // const getImgLink = async (attraction) => {
        //     try {
        //         //await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&origin=*&titles=${attraction.properties.datasource.raw.wikipedia}`)
        //         //await axios.get(`${URL}/wikiImg/`)
        //        const imgURL = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&origin=*&titles=${attraction}`)
        //        //console.log(imgURL.data.query.pages[0].original.source)
        //        setImageLinks([...imageLinks, imgURL.data.query.pages[0].original.source])
        //        return imgURL.data.query.pages[0].original.source
        //         // .then(function (response) {
        //         //     //console.log(response.data.query.pages[0].original)
        //         //     //const wikiImg = response.data.query.pages[0].original
        //         //     //console.log("wiki image: ", wikiImg.source)
                    
        //         //     return response.data.query.pages[0].original
                    
        //         //     //setImageLinks([...imageLinks, wikiImg])
                    
        //         // })
        //         //.catch (err => console.log(err))
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        //console.log("img att function", attractions)
       //console.log("IMAGE LINKS", imageLinks[0])
        
        const imgAtt = attractions.slice(0, 5).map((attraction) => (
            //console.log(getImgLinks(attraction))

            <ListGroup.Item key={attraction.properties.name}
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
            <div className="ms-2 me-auto">
            {/* <img className="float-left" style={{ maxWidth: '8rem' }}src={getImgLink(attraction.properties.datasource.raw.wikipedia)}></img> */}

            <div className="fw-bold">{attraction.properties.name}</div>
                {attraction.properties.address_line2}
                {/* {attraction.properties.name}!! */}
                {/* <h1>{getImgLink(attraction.properties.datasource.raw.wikipedia)}</h1> */}
            </div>
            {/* <h2>{getImgLinks(attraction)}</h2> */}
            </ListGroup.Item>
        ))

        return imgAtt
    }

 
    const displaySummary = async () => {
        const locSummary = await axios.get(`${URL}/wikiSummary/${state}`)
        //console.log(locSummary.data)
        setDescription(locSummary.data)
    }


    
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
            
            <div className="container" style={{marginBottom: 50}}>
           
            <div className="narrow">
                <h1 className="home" style={{fontFamily: "Georgia"}}>About {location}</h1>
            </div>
            <Container className="description">
                <div className="description-text">
                    {description}
                </div>
                
            </Container>

            <div className="horiz-div">
                <div className="spaced-apart">
                    <Card border="info" style={{ width: '36rem' }}>

                    <Card.Header className="hotel-header-color">Places to Stay</Card.Header>

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
                </div>
                        
                <div className="spaced-apart">
                    <Card border="info" style={{ width: '36rem' }}>
                    <Card.Header className="things-to-do-color">Things To Do</Card.Header>

                    {/* {!touristLoading && !useImg ? (     */}
                    {!touristLoading ? (
                    <ListGroup variant="flush" as="ol" numbered>
                        {/* <ListGroup.Item style={{padding: 0}}> */}
                            {/* <div className="card-horizontal">
                                <Row> */}
                                    {/* <Col> */}
                                        {/* <div class="img-square-wrapper"> */}
                                            {/* className='col-6'<img className="float-left" style={{ maxWidth: '8rem' }}src='https://s3-media2.fl.yelpcdn.com/bphoto/iWV-RGF0V_feXhgpboMTIg/o.jpg'></img> */}
                                        {/* </div> */}
                                    {/* </Col> */}
                                    {/* <Col> */}
                                        {/* <div className="section"> */}
                                        {displayImgAttractions()}
                                        {/* </div> */}
                                    {/* </Col> */}
                                {/* </Row>
                            </div> */}
                        {/* </ListGroup.Item>   */}
                    </ListGroup>
                    ) : (
                        <div className="center-spinner">
                        <Spinner animation="border" role="status" border="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>  
                    )}
                </Card>
                </div>

            </div>
            
            
            </div>
            <br></br>
        </div>
    )
}

export default LocationDetails
