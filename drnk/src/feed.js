import React, {useState} from "react";
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
import UserClick from "./sharedComponents/userClick";
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
    const [anchor, setAnchor] = useState(null);
    const handleClick = (ev) => {
        setAnchor(ev.target)
    }
    const handleClose = () => {
        setAnchor(null);
    }
    return <React.Fragment>
        <Card className='card-feed'>
        <Card.Header>
            <Row>
                <Col sm='auto' className="pr-0 clickable" onClick={handleClick}>
                    <Image src={props.details.profile} fluid thumbnail roundedCircle className="profile" />
                </Col>
                <Col className="text-align-left d-flex justify-content-center flex-column clickable" onClick={handleClick}>
                    <span className="name">{props.details.name}</span>
                </Col>
                <Col xs={{order: 12, span: 'auto'}} className="d-flex justify-content-center flex-column">
                    {props.details.time} ago
                </Col >
            </Row>
        </Card.Header>
        <Card.Body className="pt-0 px-0">
            <Stack className="pt-0 mt-0">
                <Image src={props.details.image} className='feed-pic' />
                <Row className='feed-caption align-items-center mx-0'> 
                    <Col>
                        <div className="mt-1">
                            <span>{props.details.caption}</span>
                        </div>
                    </Col>
                    <Col sm='auto' lg={{order: 'last'}}>
                        <ButtonGroup className="bl-2">
                        <Button className='btn-secondary bl-2'>Cheers!</Button>
                        <Button className='btn-secondary bl-2'>Another please</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Stack>
        </Card.Body>
    </Card>
    <UserClick anchor={anchor} onClose={handleClose} username={props.details.name} onClick={(user)=>console.log('todo '+user)} />
    </React.Fragment>
}

export default function Feed() {
    const feedItems = getFeed();
    return <Container className="feed">
        <Row>
            <Col lg='2'>
            </Col>
            <Col lg='8'>
                <Stack gap='3'>
                {feedItems.map((item) => <FeedItem details={item} key={item.caption} />)}
                </Stack>
            </Col>
            <Col lg='2'>

            </Col>
        </Row>
    </Container>
}