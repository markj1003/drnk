import React, { useState } from "react";
import DefaultPic from "../assets/default_profile.svg";
import Options from "../assets/options.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FriendItem(props) {
    const color = props.status ? 'success' : 'danger';
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        console.log(show);
        setShow(!show);
    }
    return <React.Fragment>
        <hr className="p-0"/>
        <Row>
            <Col className="col-3">
                <img className={"mr-5 friendPP border-"+color} src={DefaultPic}/>
            </Col>
            <Col className="col-6 d-flex justify-content-center ">
                <div className="col-username">
                    <span className="text-tab"> {props.username} </span>
                </div>
            </Col>
            <Col className="col-3 d-flex">
                <Dropdown className="btn-toggle option d-flex flex-column justify-content-center">
                    <Dropdown.Toggle>
                    <Image src={Options} className="friend-option" onClick={toggleShow} />
                    </Dropdown.Toggle>
                <Dropdown.Menu popperConfig={{placement: 'left'}} role="menu" className="top">
                        <Dropdown.Item>View user profile</Dropdown.Item>
                        <Dropdown.Item>Remove friend</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    </React.Fragment>
}