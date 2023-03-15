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
import InputButton from '../sharedComponents/inputButton';

export default function FriendSideBar(props) {
    const [filter, setFilter] = useState('');
    const onChange = (text) => {
        setFilter(text.toLowerCase());
    }
    if (!props.show && filter) {
        setFilter('');
    }
    return (
        <>
            <Offcanvas className='bg-light oc-tab' show={props.show} onHide={props.onHide} placement={'start'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Friends </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='overflow-auto mb-5'>
                    <FriendList filter={filter} onClick={props.onClick} />
                    <div className='bottom-search-bar py-2 bg-dark'>
                <InputButton keep placeholder='Search friends' button='Search' onChange={onChange} />
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}