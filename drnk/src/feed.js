import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ProfilePicLang from './assets/aboutPhotos/lang.jpg';
import ProfilePicEnnis from './assets/aboutPhotos/enner.jpg';
import Stack from "react-bootstrap/Stack";
import SampleFeedLang from './assets/sampleFeedPic.jpg';
import SampleFeedEnner from './assets/sampleFeedEnner.jpg';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './feed.css';

function getFeed() {
    return [{
        name: 'Liam Lang',
        time: '2 hours',
        caption: 'God I love a love a tasty pint',
        image: SampleFeedLang,
        profile: ProfilePicLang
    },
    {
        name: 'William Ennis',
        time: '4 hours',
        caption: "Pimping ain’t easy but somebody’s gotta do it",
        image: SampleFeedEnner,
        profile: ProfilePicEnnis
    }]
}

function FeedItem(props) {
    return <Card className='card-feed'>
        <Card.Header>
            <Row>
                <Col lg='2'>
                    <Image src={props.details.profile} fluid thumbnail roundedCircle className="profile" />
                </Col>
                <Col lg='4' className="text-align-left d-flex justify-content-center flex-column">
                    <span className="name">{props.details.name}</span>
                </Col>
                <Col lg='4' />
                <Col lg='2' className="d-flex justify-content-center flex-column">
                    {props.details.time} ago
                </Col >
            </Row>
        </Card.Header>
        <Card.Body className="pt-0 px-0">
            <Stack className="pt-0 mt-0">
                <Image src={props.details.image} className='feed-pic' />
                <Row className='feed-caption mx-0'> 
                    <Col lg='8'>
                        <div className="mt-1">
                            <span>{props.details.caption}</span>
                        </div>
                    </Col>
                    <Col lg='4' className="d-flex justify-content-center">
                        <ButtonGroup className="bl-2">
                        <Button className='btn-secondary bl-2'>Cheers!</Button>
                        <Button className='btn-secondary bl-2'>Another please</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Stack>
        </Card.Body>
    </Card>
}

export default function Feed() {
    const feedItems = getFeed();
    return <Container className="mb-5">
        <Row>
            <Col lg='2'>
            </Col>
            <Col lg='8'>
                <Stack gap='3'>
                {feedItems.map((item) => <FeedItem details={item} />)}
                </Stack>
            </Col>
            <Col lg='2'>

            </Col>
        </Row>
    </Container>
}