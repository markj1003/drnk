import React from "react"
import { Button, Col, Row, Stack } from "react-bootstrap"
import Card from 'react-bootstrap/Card'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Avatar } from "@mui/material"
import Enner from "../assets/aboutPhotos/enner.jpg"
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from "react"

const responsive = {
    small: {
        breakpoint: { max: 699, min: 200 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 1023, min: 700},
        items: 3
    },
    large_desktop: {
        breakpoint: { max: 3000, min: 1024},
        items: 4
    }
}

function getFakeRoom() {
    return [
        {
            user: {
                username: 'William',
                pic: Enner
                },
            rules: [{
                name: 'Drinks on',
                value: 'Select'
            },
            {
                name: 'Gives out shot on',
                value: 'Select'
            },
            {
                name: 'Tells a story on',
                value: 'Select'
            }]
        },
        {
            user: {
                username: 'William',
                pic: Enner
                },
            rules: [{
                name: 'Drinks on',
                value: 'Select'
            },
            {
                name: 'Gives out shot on',
                value: 'Select'
            },
            {
                name: 'Tells a story on',
                value: 'Select'
            }]
        },
        {
            user: {
                username: 'William',
                pic: Enner
                },
            rules: [{
                name: 'Drinks on',
                value: 'Select'
            },
            {
                name: 'Gives out shot on',
                value: 'Select'
            },
            {
                name: 'Tells a story on',
                value: 'Select'
            }]
        },
        {
            user: {
                username: 'William',
                pic: Enner
                },
            rules: [{
                name: 'Drinks on',
                value: 'Select'
            },
            {
                name: 'Gives out shot on',
                value: 'Select'
            },
            {
                name: 'Tells a story on',
                value: 'Select'
            }]
        },
    ]
}

export default function Roulette() {
    return <React.Fragment>
        <Row>
            <Col>
                <h1>
                    Filler
                </h1>
            </Col>
        </Row>
        <Row>
            <Col className="px-4">
                <h2>
                    Welcome to Drinks Roulette!
                </h2></Col>
        </Row>
        <Row>
            <Col xs={6} lg={5}>
                <div className="px-2 mx-2 border" style={{"height": "400px"}}>
                    <h3>Wheel</h3>
                </div>
            </Col>
            <Col>
                <div className="bg-secondary h-100">
                    <h4> Please </h4>
                </div>
            </Col>
        </Row>
        <Row className="py-5">
            <Col>
                <div className="bg-primary px-2" style={{'height': '100%'}}>
                    <Carousel responsive={responsive}>
                        <PlayerCard />
                        <PlayerCard />
                        <PlayerCard />
                        <PlayerCard />
                    </Carousel>
                </div>
            </Col>
        </Row>
    </React.Fragment>
}

function PlayerCard() {
    return <Card>
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col xs={2}>
                        <Avatar src={Enner} /> 
                    </Col>
                    <Col className="d-flex align-items-center">
                        <span> William </span>
                    </Col>
                </Row>
            </Card.Title>
                
            <Card.Text>
                <Stack gap={2}>
                    <CardItem action="Drinks on" />
                    <CardItem action="Gives out shot on" />
                    <CardItem action="Tells a story on" />
                </Stack>
               <Row className="my-2">
                <Col />
                <Col md={{"span": "auto", "order": "last"}}>
                    <Button>Add rule</Button>
                </Col>
               </Row>
            </Card.Text>
        </Card.Body>
    </Card>
}

function CardItem(props) {
    const [selected, select]  = useState('Select')
    const handleClick = (name) => {
        select(name)
    }

    return <Row>
        <Col className="d-flex align-items-center">
            <span>
                {props.action}
            </span>
        </Col>
        <Col md={{"span": "auto", "order": "last"}}>
            <Dropdown>
                <Dropdown.Toggle>
                    {selected}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>handleClick('Even')}>Even</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handleClick('Odd')}>Odd</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Row>
}