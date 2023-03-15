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
import UserOptions from "../sharedComponents/userOptions";
import UserClick from "../sharedComponents/userClick";
import './FriendList.css';

export default function FriendItem(props) {
    const color = props.status ? 'success' : 'danger';
    const [anchor, setAnchor] = useState(null);
    const handleClick = (ev) => {
        setAnchor(ev.target)
    }
    const handleClose = () => {
        setAnchor(null);
    }
    const small = props.small ? ' friend-small' : '';
    return <React.Fragment>
        <Divider className="bg-dark" />
        <Row className={"h-100 align-items-center mt-1 mb-1"+small}>
            <Col xs='4' lg='3' className="col-friend">
                <img className={"mr-5 friendPP border-"+color} src={props.pic ? props.pic : DefaultPic}/>
            </Col>
            <Col xs='4' lg='6' className="d-flex justify-content-center " onClick={handleClick}>
                <div className="col-username">
                    <span className="text-tab clickable"> {props.username} </span>
                </div>
            </Col>
            <Col xs='4' lg='3' className="d-flex justify-content-center">
                <UserOptions onClick={props.onClick} username={props.username} />
            </Col>
        </Row>
        <UserClick anchor={anchor} onClose={handleClose} username={props.username} onClick={(user)=>console.log('todo '+user)} />
    </React.Fragment>

}

export function OnlineStatus(props) {
    return <span style={{color: props.online ? "green" : "red"}}>●</span>
}