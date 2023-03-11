import React, { useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FriendList from "./friend/FriendList";

function RoomsSideBar(props) {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.onHide} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Rooms </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function FriendSideBar(props) {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.onHide} placement={'start'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Friends </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FriendList />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default function SelectNavBar () {
    const [showFriends, setShowFriends] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const handleCloseFriends = () => setShowFriends(false);
    const handleShowFriends = () => setShowFriends(true);
    const handleCloseRooms = () => setShowRooms(false);
    const handleShowRooms = () => setShowRooms(true);
    return <div>
            <NavBar fixed='bottom' className='d-flex justify-content-between px-3'>
                <Button variant='primary' onClick={handleShowFriends}>Friends</Button>
                <Button variant='primary' onClick={handleShowRooms}>Rooms</Button>
            </NavBar>
            <FriendSideBar show={showFriends} onHide={handleCloseFriends} />
            <RoomsSideBar show={showRooms} onHide={handleCloseRooms} />
        </div>
}