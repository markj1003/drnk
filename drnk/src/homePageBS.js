import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FriendList from "./friend/FriendList";
import useIntervalHook from "./hooks/useIntervalHook";
import store from "./store";
import {getUserStatuses} from "./storeSlices/onlineStatusesSlice";

function RoomsSideBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}> Rooms </Button>

            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
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

function FriendSideBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={"primary"} onClick={handleShow}>Friends</Button>

            <Offcanvas show={show} onHide={handleClose} placement={'start'}>
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

export default function HomePage() {
    //this will get the online statuses of all your friends every 2 mins
    // todo: send an update request to the server every x mins to say you're still online
    useIntervalHook(() => {
        store.dispatch(getUserStatuses());
    }, 120000);

    return (
        <>
            <FriendSideBar />
            <RoomsSideBar />
        </>
    );
}