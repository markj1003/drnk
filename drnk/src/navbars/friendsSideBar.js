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
import BottomNavigation from '@mui/material/BottomNavigation';
import './navbar.css';

export default function FriendSideBar(props) {
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
                <Offcanvas.Body className='no-overflow'>
                    <FriendList onClick={props.onClick} />
                    <div className='bottom-bar'>
                <Form onSubmit={onSubmit} className="ml-0 mr-0 mb-2 d-flex row justify-content-center">
                    <Col xs='10' md="7" className='p-0 justify-content-center'>
                        <Form.Control
                        type="search"
                        placeholder="Search for users"
                        className="mt-2"
                        value={search} 
                        onChange={(ev) => changeSearch(ev.target.value)}
                        />
                    </Col>
                    <Col xs='10' md="4" className='d-flex justify-content-center'>
                        <Button type='submit' variant="primary mt-2 btn-search">Search</Button>
                    </Col>
                    </Form>
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}