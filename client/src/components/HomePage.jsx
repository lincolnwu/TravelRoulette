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
            const region = e.target.id
            console.log(region)
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
            
            <div className="container">
                <div className="narrow">
                    <h1 class="home">Narrow your location by continent</h1>
                </div>
               
                
                
                <Row xs='auto' md='auto' lg='auto' className="g-4">
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="img-fluid" src={phila} width="auto" height="100%" />
                            <Card.Body>
                                <Card.Title>North America</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                                <Button id="Africa" onClick={handleRegion} variant="primary">Visit</Button>
                            </Card.Body>
                        </Card>
                    </Col>    
                </Row>
                
            </div>
        </div>
        
    )
}

export default HomePage
