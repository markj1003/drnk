import React, { useState } from "react";
import defaultPic from "../assets/default_profile.svg";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import DetailsForm from './DetailsForm';
import FriendList from "../friend/FriendList";
import Container from 'react-bootstrap/Container';
import './profile.css';

export function RoomCard(props) {
    const navigate = useNavigate();
    return (<div className="card h-100">
    <div className="card-header d-flex"><div style={{width: '90%'}}>{props.name}</div> 
    {(props.isUser) && <Button className="btn-close" onClick={() => props.removeRoom(props.name)}/>}
    </div>
    <div className="card-body text-center">
        <Image width={150} roundedCircle src={props.pic}/>
        <div className="small font-italic text-muted mb-2">{props.desc}</div>
        <Button className="btn-primary" onClick={()=>navigate('/room')}>View Room!</Button>
    </div>
</div>)
}

function ProfileEdit(props) {
    const [formDetails, changeDetails] = useState(props.current);
    const onSubmit = () => {
        console.log(formDetails);
        props.onChange(formDetails);
        props.close();
    };
    const handleChange = (details) => {
        console.log(details);
        changeDetails(details);
    }
    return <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Edit profile details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DetailsForm current={formDetails} onSubmit={onSubmit} handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit}>Save changes</Button>
                <Button onClick={props.close} variant='danger'>Discard changes</Button>
            </Modal.Footer>
    </Modal>
}

function Warning(props) {
    return <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            {props.header}
        </Modal.Header>
        <Modal.Body>
            {props.body} 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.close}>No</Button>
            <Button variant='danger' onClick={props.yes}>Yes</Button>
        </Modal.Footer>
    </Modal>
}

export function Rooms(props) {
    const [toRemove, changeRemove] = useState('');
    const [removeWarning, setRemove] = useState(false);
    const header = 'Leave room?';
    const body = 'Are you sure you want to leave this room? All progress will be lost.'
    const toggleRemove = () => {setRemove(!removeWarning)};
    const removeRoom = (name) => {
        changeRemove(name);
        toggleRemove();
    }
    const confirmRemove = () => {
        props.removeRoom(toRemove);
        toggleRemove();
    }
    return <React.Fragment>
        <Warning header={header} body={body} show={removeWarning} close={toggleRemove} yes={confirmRemove} />
        <Card className="pb-5">
        <Card.Header>Rooms</Card.Header>
        <Card.Body>
            <Row className="gy-2">
                {props.rooms.map((room) =>
                <Col sm='6' lg='4' key={room.name}>
                    <RoomCard name={room.name} desc={room.desc} pic={room.pic} 
                    removeRoom={removeRoom} isUser={props.isUser} />
                </Col>
                )}
            </Row>
        </Card.Body>
    </Card>
    </React.Fragment>
}

export function ProfileCard(props) {
    return (<div className="card">
        <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
                <img src={defaultPic} alt="Admin" className="rounded-circle" width="150" />
                <div className="mt-3">
                <h4>{props.details.Name}</h4>
                <p className="text-muted font-size-sm">{props.details.Title}</p>
                </div>
                {!props.isUser && <Row className="gx-2 w-100 d-flex justify-content-center">
                    <Col xs='auto'>
                        <Button className="px-2">Add friend</Button>
                    </Col>
                    <Col xs='auto'>
                        <Button className="gx-2">Message</Button>
                    </Col>
                    </Row>}
            </div>
        </div>
    </div>)
}

export function DetailsCard(props) {
    const [edit, setEdit] = useState(false);
    const editHandler = () => {
        setEdit(!edit);
    }
    return (
    <React.Fragment>
        <ProfileEdit show={edit} close={editHandler} current={props.details} onChange={props.onChange} />
    <div className="card mb-3">
    <div className="card-header">
        Details
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-sm-4">
          <h6 className="mb-0">Username</h6>
        </div>
        <div className="col-sm-8">
          <p className="mb-0">{props.details.Username}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-4">
          <h6 className="mb-0">Email</h6>
        </div>
        <div className="col-sm-8">
          <p className="mb-0">{props.details.Email}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-4">
            <h6 className="mb-0">Favourite beverage</h6>
        </div>
        <div className="col-sm-8">
            <p className="mb-0">{props.details.Beverage}</p>
        </div>
      </div>
        <hr />
                  <div className="row">
                    <div className="col-sm-12">
                        {
                        props.isUser && <Button onClick={editHandler}> Edit profile </Button>
                        }
                    </div>
                  </div>
                </div>
    
    </div>
    </React.Fragment>)
}

function StatsItem(props) {
    let percentage = 100*parseFloat(props.prog)/parseFloat(props.target);
    percentage = percentage.toString()+'%';
    return (<div className="px-2">
                <div className="d-flex justify-content-between">
                    <small>{props.title}</small>
                    <small>{props.prog}/{props.target}</small>
                </div>
                <div className="progress" style={{height: "5px"}}>
                    <div className="progress-bar bg-primary" style={{"width": percentage}}></div>
                </div>
                <div>
                        <small><i>Level {props.level}</i></small>
                </div>
            </div>)
}

export function StatsCard(props) {
    return (
        <div className="card">
            <div className="card-title text-center pt-2">
                <h6>
                    <i className="text-info">Awards overview</i>
                </h6>
            </div>
            {props.awards.map((award) =>
                <StatsItem title={award.title} prog={award.prog} 
                    target={award.target} level={award.level} key={award.title} />
            )}
            
        </div>)
}

//todo: decide on a reasonable max height for this
export function FriendsCard(props) {
    const navigate = useNavigate();
    const onClick = (username) => {
        navigate('/u/' + username)
    }
    return <Card className="card-friends" >
        <Card.Header className="d-flex justify-content-center">
            <h6><i className="text-info">Friends</i></h6>
        </Card.Header>
        <Container className="overflow-auto">
        <FriendList small onClick={onClick} />
        </Container>
        </Card>
}