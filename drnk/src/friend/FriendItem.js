import React, { useState } from "react";
import DefaultPic from "../assets/default_profile.svg";
import Popover from '@mui/material/Popover';
import SettingsIcon from '@mui/icons-material/Settings';
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@mui/material/Divider';

export default function FriendItem(props) {
    const color = props.status ? 'success' : 'danger';
    const [anchor, setAnchor] = useState(null);
    const [show, setShow] = useState(false);
    const handleClick = (ev) => {
        setAnchor(ev.target)
    }
    const handleClose = () => {
        setAnchor(null);
    }
    const open = Boolean(anchor);

    return <React.Fragment>
        <Divider className="bg-dark" />
        <Row className="align-items-center mt-1 mb-1">
            <Col xs='4' lg='3'>
                <img className={"mr-5 friendPP border-"+color} src={props.pic ? props.pic : DefaultPic}/>
            </Col>
            <Col xs='4' lg='6' className="d-flex justify-content-center " onClick={handleClick}>
                <div className="col-username">
                    <span className="text-tab clickable"> {props.username} </span>
                </div>
            </Col>
            <Col xs='4' lg='3' className="d-flex justify-content-center">
                <Dropdown >
                    <Dropdown.Toggle  >
                    <SettingsIcon />
                    </Dropdown.Toggle>
                <Dropdown.Menu popperConfig={{placement: 'left'}} role="menu" className="top">
                        <Dropdown.Item onClick={() => props.onClick(props.username)}>View user profile</Dropdown.Item>
                        <Dropdown.Item>Remove friend</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom'}}
            >
                <ButtonGroup variant='solid' orientation="vertical">
                    <Button>Send message</Button>
                    <Button>Challenge!</Button>
                </ButtonGroup>
            </Popover>
    </React.Fragment>

}

export function OnlineStatus(props) {
    return <span style={{color: props.online ? "green" : "red"}}>●</span>
}