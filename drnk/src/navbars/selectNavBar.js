import React, { useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import RoomsSideBar from './roomsSideBar';
import FriendSideBar from './friendsSideBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PopupItems from './messaging';

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

    return <React.Fragment>
        <div>
            <NavBar fixed='bottom' className={'bottom-bar row px-3 '+visibility}>
                <Col>
                    <Button className='btn-drawer' variant='primary' onClick={handleShowFriends}>Friends</Button>
                </Col>
                <Col className='d-flex flex-row-reverse'>
                    <PopupItems />
                </Col>
                <Col sm='auto' className='d-flex flex-row-reverse'>
                    <Button className='btn-drawer' variant='primary' onClick={handleShowRooms}>Rooms</Button>
                </Col>
            </NavBar>
            <FriendSideBar onClick={onClick} show={showFriends} onHide={handleCloseFriends} />
            <RoomsSideBar show={showRooms} onHide={handleCloseRooms} />
        </div>
        
    </React.Fragment>
}

