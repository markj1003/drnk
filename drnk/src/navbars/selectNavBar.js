import React, { useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FriendList from "../friend/FriendList";
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

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
    const [search, changeSearch] = useState('');
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(search);
    }
    return (
        <>
            <Offcanvas className='bg-light oc-tab' show={props.show} onHide={props.onHide} placement={'start'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Friends </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FriendList onClick={props.onClick} />
                <Form onSubmit={onSubmit} className="d-flex row justify-content-center pb-2 fixed-bottom fb-search">
                    <Col md="9" className='d-flex justify-content-center pl-0'>
                        <Form.Control
                        type="search"
                        placeholder="Search for users"
                        className="mt-2"
                        value={search} 
                        onChange={(ev) => changeSearch(ev.target.value)}
                        />
                    </Col>
                    <Col md="3" className='d-flex justify-content-center pr-0 pl-0'>
                        <Button type='submit' variant="primary mt-2">Search</Button>
                    </Col>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default function SelectNavBar () {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.login.loggedIn);
    const visibility = isLoggedIn ? "visible" : "invisible";
    console.log(visibility);
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
            <NavBar fixed='bottom' className={'d-flex justify-content-between px-3 '+visibility}>
                <Button variant='primary' onClick={handleShowFriends}>Friends</Button>
                <Button variant='primary' onClick={handleShowRooms}>Rooms</Button>
            </NavBar>
            <FriendSideBar onClick={onClick} show={showFriends} onHide={handleCloseFriends} />
            <RoomsSideBar show={showRooms} onHide={handleCloseRooms} />
        </div>
}