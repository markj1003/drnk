import React, { useState, useEffect } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Avatar, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import RoomsSideBar from './roomsSideBar';
import FriendSideBar from './friendsSideBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Popper, Card, CardHeader, CardContent } from '@mui/material';
import Lang from '../assets/aboutPhotos/lang.jpg';
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import Joyal from '../assets/aboutPhotos/joyal.jpg';


function getActiveItems() {
    return [{
        username: 'Liam',
        pic: Lang
    },
    {
        username: 'Ruaridh',
        pic: Ruaridh
    },
    {
        username: 'Joyal',
        pic: Joyal
    }];
}

export default function SelectNavBar () {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.login.loggedIn);
    const visibility = isLoggedIn ? "visible " : "invisible ";
    const [showFriends, setShowFriends] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const handleCloseFriends = () => setShowFriends(false);
    const handleShowFriends = () => setShowFriends(true);
    const handleCloseRooms = () => setShowRooms(false);
    const handleShowRooms = () => setShowRooms(true);
    const onClick = (username) => {
        handleCloseFriends();
        navigate('/u/' + username)
    }

    return <div>
            <NavBar fixed='bottom' className={'bottom-bar row px-3 '+visibility}>
                <Col>
                    <Button variant='primary' onClick={handleShowFriends}>Friends</Button>
                </Col>
                <Col className='d-flex flex-row-reverse'>
                    <PopupItems />
                </Col>
                <Col sm='auto' className='d-flex flex-row-reverse'>
                    <Button variant='primary' onClick={handleShowRooms}>Rooms</Button>
                </Col>
            </NavBar>
            <FriendSideBar onClick={onClick} show={showFriends} onHide={handleCloseFriends} />
            <RoomsSideBar show={showRooms} onHide={handleCloseRooms} />
        </div>
}

function PopupItems() {
    const [active, setActive] = useState(false);
    const [anchor, setAnchor] = useState(null);
    useEffect(() => {
        if (anchor) {
          document.addEventListener("mousedown", handleClick)
        } else {
          document.removeEventListener("mousedown", handleClick)
        }
       // Specify how to clean up after this effect:
       return function cleanup() {
          document.removeEventListener("mousedown", handleClick)
       }
    }, [anchor])
    
    const handleClick = (ev) => {
        const el = document.getElementById('messagePopper');
        if (ev.target.parentElement.getAttribute('name') === 'messHead') {
        }
        else if (el && !el.contains(ev.target)) {
            setActive(false);
            setAnchor(null);
        }
    }
    const handleAvClick = (ev, username) => {
        if (active && ev.target === anchor) {
            setActive(false);
            setAnchor(null);
        }
        else {
            setActive(true);
            setAnchor(ev.target);
        }
    }
    const handleClose = () => {
        setActive(false);
    }
    const open = Boolean(active);
    const items = getActiveItems();
    return (<React.Fragment>
        <Popper
            id='messagePopper'
            open={open}
            anchorEl={anchor}
            placement="top-start"
            disablePortal={false}
        >   
            <MessageBox />
        </Popper>
        <div className='d-flex'>
        {items.map((item) => 
            <Avatar name='messHead' key={item.username} src={item.pic} onClick={(ev)=>handleAvClick(ev, item.username)}
            className='mx-1 clickable' style={{border: '2px solid #faf3e8'}}></Avatar>)
        }
        </div>
            </React.Fragment>)
}

function MessageBox(props) {
    return <Card variant='outline' className='bg-light msg-open'>
            <FeedHeader />
            <CardContent className='px-0 pt-0'>
                <Divider variant='fullWidth' className='bg-dark' />
                <Container className='msg-container'>
                    <MessageFeed />
                </Container>
            </CardContent>
        </Card>
}

function MessageFeed(props) {
    const messages = [{sender: 0, message:'a few beers?'}, {sender: 1, message:'surely'}]
    return <Container>
        {messages.map((message)=> 
        <Row className='mt-2' key={message.message}>
            <Col sm={{span: 8, offset: 4*message.sender}}>
                <Message message={message.message} />
                
            </Col>
        </Row>)}
    </Container>
}

function FeedHeader(props) {
    return <CardHeader className='p-2 bg-dark' 
        title={<div className='d-flex justify-content-between'>
            <div className='d-flex flex-column justify-content-center'>
                <span className='align-bottom text-light'>
                    Liam Lang
                </span>
            </div>
            <Button className=''>X</Button>
            </div>} 
        avatar={<Avatar src={Lang}/>} />
}

function Message(props) {
    return <Card className='mx-0'>
            <CardHeader className='p-0' title='Liam 17:00' avatar={<Avatar className='m-2' src={Lang} />} />
            <CardContent className='p-0'>
                <Divider className='bg-dark'/>
                <span className='px-2'>{props.message}</span>
            </CardContent>
        </Card>
}