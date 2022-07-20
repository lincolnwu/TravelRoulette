import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import phila from '../assets/philaicon.jpeg'
import southA from '../assets/southamericaicon.jpeg'
import paris from '../assets/paris1.jpeg'
import china from '../assets/chinatower.jpeg'
import reef from '../assets/reef.jpeg'
import giza from '../assets/giza.jpeg'
import NA from '../assets/NorthAmerica.jpeg'
import Container from 'react-bootstrap/Container'

const HomePage = () => {
    const navigate = useNavigate();
    const URL = "http://3.82.189.184:5000"

    const [photoLink, setPhotoLink] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send get request to backend to generate random location
            let location = await axios.get(`${URL}/randomPlaceComplete`)
            //console.log("random location received from server: ", location)

            //let photoBackground = axios.get(`${URL}/places/${location.data}`).then((res) => setPhotoLink(res.data.large2x)).catch((err) => console.log(err))
            //console.log(photoBackground)
            //console.log(photoLink)
            //await axios.get(`/places?location=${location.data}`)
            //await axios.get(`${URL}/places/${location.data}`)

            // Navigate to a new page, and pass in a prop to hold the location data
            // navigate(`/places/${location.data}`, {state : `${location.data}`, photo : `${photoLink}`})
            //console.log("sending location to next page ... ")
            navigate(`/places/${location.data}`, {state : `${location.data}`})
            

        } catch (error) {
            console.log(error)
        }
    }

    // const bgDict = {
    //     "North America": NA
    // }

    const handleRegion = (e) => {

        e.preventDefault();
        // console.log(NA)
        
        try {
            const region = e.target.id
            
            // if (region === "North America") {
            //     let bgSrc = NA
            // }

            //console.log(region)
            //navigate(`/region/${region}`, { state : {region: `${region}`, img: bgDict[region]}})
            navigate(`/region/${region}`, { state : `${region}`})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <div className="bg">
                <div className="container">
                    <div className="title">
                        <h1>Planning your next trip?</h1>
                    </div>
                    <div className="welcome">
                        <h2>Let us choose for you</h2>
                    </div>
                    <div className="col text-center">
                        <Button variant="primary" onClick={handleSubmit}>Generate a Random Location!</Button>
                    </div>
                </div>
            </div>
            
            {/* <div className="container"> */}
            <div className="narrow">
                    <h1 className="home">Narrow your location by continent</h1>
                </div>
            <Container className="homepage-container-bottom">
                
               
                <Row xs='auto' md='auto' lg='auto' className="g-4">
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={phila} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>North America</Card.Title>
                                <Card.Text>
                                North America is the third largest continent in size and is home to 23 countries.
                                </Card.Text>
                                <Button id="North America" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={southA} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>South America</Card.Title>
                                <Card.Text>
                                South America is home to the largest river as well as the world's driest place. 
                                </Card.Text>
                                <Button id="South America" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={paris} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>Europe</Card.Title>
                                <Card.Text>
                                Often described as a "peninsula of peninsulas," Europe is the second smallest continent in size.
                                </Card.Text>
                                <Button id="Europe" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={china} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>Asia</Card.Title>
                                <Card.Text>
                                Asia is considered to be the largest and most diverse continent due to its historical importance.
                                </Card.Text>
                                <Button id="Asia" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={reef} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>Oceania</Card.Title>
                                <Card.Text>
                                Oceania is a region made up of thousands of islands scattered throughout the Pacific Ocean.
                                </Card.Text>
                                <Button id="Oceania" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={giza} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>Africa</Card.Title>
                                <Card.Text>
                                Considered to be the most tropical of all continents, Africa is known for its deserts and rivers.
                                </Card.Text>
                                <Button id="Africa" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>    
                </Row>
                
            {/* </div> */}
            </Container>
        </div>
        
    )
}

export default HomePage
