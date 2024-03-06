import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Avatar, Divider } from '@mui/material';
import './navbar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Popper, Card, CardHeader, CardContent } from '@mui/material';
import Lang from '../assets/aboutPhotos/lang.jpg';
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import Joyal from '../assets/aboutPhotos/joyal.jpg';
import Default from '../assets/default_profile.svg';
import InputButton from '../sharedComponents/inputButton';
import UserClick from '../sharedComponents/userClick';
import store from '../storeSlices/store';
import { removeMessager } from '../storeSlices/activeMessages';
import {connect, useDispatch, useSelector} from 'react-redux';
import getFriend from '../serverInterface/detailsInterface';
import { getActiveMessages } from '../storeSlices/activeMessages';

var messages = [{sender: 0, message:'a few beers?', time:'16:58'}, {sender: 1, message:'surely', time:'17:00'}];

function addMessage(m) {
    messages = [...messages, m];
}

function getMe() {
    return {
        username: 'Kwang',
        pic: Lang
    }
}

export default function PopupItems() {
    const [active, setActive] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [activeUser, setActiveUser] = useState('');

    const handleXClick = (ev, username) => {
        store.dispatch(removeMessager(username));
        const el = document.getElementById('messagePopper');
        if (ev.target.parentElement.getAttribute('name') === 'messHead') {
        }
        else if (el) { // && !el.contains(ev.target)) {
            setActive(false);
            setAnchor(null);
        }
    }
    const handleClick = (ev, username) => {
        if (active && username === activeUser) {
            setActive(false);
            setAnchor(null);
        }
        else {
            setActive(true);
            setAnchor(ev.target);
            setActiveUser(username);
        }
    }

    const initial = (ev, username) => {
            setActive(true);
            setAnchor(ev.target.children[0]);
            setActiveUser(username);
    }

    const open = Boolean(active);
    const colour = open ? 'active' : 'inactive';
    return (<React.Fragment>
            <MessagePopper anchor={anchor} open={open} user={activeUser}
                onClick={handleXClick} />
            <ActiveBubbles initial={initial} onClick={handleClick} />
            </React.Fragment>)
}

function MessagePopper(props) {
    return <Popper
        id='messagePopper'
        data-for='messagePopper'
        open={props.open}
        anchorEl={props.anchor}
        placement="top-start"
        disablePortal={false}
    >   
        <MessageBox username={props.user} onClick={props.onClick} />
    </Popper>
}

function mapStateToProps(state) {
    const names = state.activeMessages;
    return {names: names};
}
function ActiveBubblesUnlinked(props) {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getActiveMessages())
    }, [])
    const giveRef = (username, ref) => {
        props.initial({target: ref.current}, username);
    }
    return <div className='d-flex'>
        {(props.names).map((item) => 
            <Bubble key={item} username={item} giveRef={giveRef} onClick={props.onClick} />)
        }
    </div>
}
const ActiveBubbles = connect(mapStateToProps)(ActiveBubblesUnlinked);

function Bubble(props) {
    const bubbleRef = useRef(null);
    const details = getFriend(props.username);

    useEffect(() => {
        props.giveRef(details.username, bubbleRef);
    }, []);

    const onClick = (ev) => {
        props.onClick(ev, details.username)
    }
    return <div>
        <Avatar 
            ref={bubbleRef} name='messHead' key={details.username} 
            src={details.pic} onClick={onClick}
            className='mx-1 clickable' style={{border: '2px solid #faf3e8'}} />
        </div>
}

function MessageBox(props) {
    const [dummy, update] = useState('');
    const data = getFriend(props.username);
    const onSubmit = (text, time) => {
        addMessage({sender: 1,
            message: text,
            time: time});
        update(text);
    }
    return <Card variant='outline' className='bg-light msg-open'>
            <FeedHeader data={data} onClick={props.onClick} />
            <CardContent className='p-0'>
                <Divider variant='fullWidth' className='bg-dark' />
                <Container className='msg-container overflow-auto'>
                    <MessageFeed data={data} dummy={dummy} />
                </Container>
                <div className='bg-dark pb-2 pt-2'>
                    <InputButton onSubmit={onSubmit} placeholder='Enter a message' button='Send' />
                </div>
            </CardContent>
        </Card>
}

//props message
function MessageFeed(props) {
    const me = getMe();
    const dummy = props.dummy;
    return <Container>
        {props.data.messages.map((message)=> 
        <Row className='mt-2' key={message.message}>
            <Col sm={{span: 8, offset: 4*message.sender}}>
                {message.sender ? <Message username={me.username} pic={me.pic} message={message} />
                : <Message username={props.data.username} pic={props.data.pic} message={message} />}
                
            </Col>
        </Row>)}
    </Container>
}

function FeedHeader(props) {
    const [anchor, setAnchor] = useState(null);
    const onClick = (ev) => {
        setAnchor(ev.target);
    }
    const onClose = () => {
        setAnchor(null);
    }
    return <React.Fragment>
        <CardHeader className='p-2 bg-dark' 
        title={<div className='d-flex justify-content-between'>
            <div className='d-flex flex-column justify-content-center clickable'
                onClick={onClick}>
                <span className='align-bottom text-light'>
                    {props.data.username}
                </span>
            </div>
            <Button onClick={(ev)=>props.onClick(ev, props.data.username)}>X</Button>
            </div>} 
        avatar={<Avatar src={props.data.pic}/>} />
        <UserClick profile nomsg anchor={anchor} username={props.data.username} onClose={onClose} />
        </React.Fragment>
}

function Message(props) {
    return <Card className='mx-0'>
            <CardHeader className='p-0' title={props.username+' '+props.message.time} avatar={<Avatar className='m-2' src={props.pic} />} />
            <CardContent className='p-0'>
                <Divider className='bg-dark'/>
                <span className='px-2'>{props.message.message}</span>
            </CardContent>
        </Card>
}