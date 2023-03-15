import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Avatar, Divider } from '@mui/material';
import './navbar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Popper, Card, CardHeader, CardContent } from '@mui/material';
import Lang from '../assets/aboutPhotos/lang.jpg';
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import Joyal from '../assets/aboutPhotos/joyal.jpg';
import Default from '../assets/default_profile.svg';
import InputButton from '../sharedComponents/inputButton';
import UserClick from '../sharedComponents/userClick';

const profilePics = {
    'Liam': Lang,
    'Ruaridh': Ruaridh,
    'Joyal': Joyal
}

function getActiveItems() {
    return [{
        username: 'Liam',
        pic: Lang
    },
    {
        username: 'Ruaridh',
        pic: Ruaridh
    },
    {
        username: 'Joyal',
        pic: Joyal
    }];
}

var messages = [{sender: 0, message:'a few beers?', time:'16:58'}, {sender: 1, message:'surely', time:'17:00'}];
function getMessages(username) {
    const profile = profilePics[username];
    return {
        username: username,
        messages: messages,
        profilePic: profile
    }
}
function addMessage(m) {
    messages = [...messages, m];
}

function getMe() {
    return {
        username: 'Kwang',
        profile: Default
    }
}

export default function PopupItems() {
    const [active, setActive] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [activeUser, setActiveUser] = useState('');
    useEffect(() => {
        if (anchor) {
          //document.addEventListener("mousedown", handleClick)
        } else {
          //document.removeEventListener("mousedown", handleClick)
        }
       // Specify how to clean up after this effect:
       return function cleanup() {
          //document.removeEventListener("mousedown", handleClick)
       }
    }, [anchor])
    
    const handleXClick = (ev) => {
        console.log('x')
        const el = document.getElementById('messagePopper');
        if (ev.target.parentElement.getAttribute('name') === 'messHead') {
        }
        else if (el) { // && !el.contains(ev.target)) {
            setActive(false);
            setAnchor(null);
        }
    }
    const handleClick = (ev, username) => {
        console.log('he')
        if (active && ev.target === anchor) {
            setActive(false);
            setAnchor(null);
        }
        else {
            setActive(true);
            setAnchor(ev.target);
            setActiveUser(username);
        }
    }
    const open = Boolean(active);
    const bubbles = getActiveItems();
    return (<React.Fragment>
        <Popper
            id='messagePopper'
            open={open}
            anchorEl={anchor}
            placement="top-start"
            disablePortal={false}
        >   
            <MessageBox username={activeUser} onClick={handleXClick} />
        </Popper>
            <ActiveBubbles bubbles={bubbles} onClick={handleClick} />
            </React.Fragment>)
}

function ActiveBubbles(props) {
    return <div className='d-flex'>
        {(props.bubbles).map((item) => 
            <Avatar name='messHead' key={item.username} src={item.pic} onClick={(ev)=>props.onClick(ev, item.username)}
            className='mx-1 clickable' style={{border: '2px solid #faf3e8'}}></Avatar>)
        }
    </div>
}
function MessageBox(props) {
    const [dummy, update] = useState('');
    const data = getMessages(props.username)
    const onSubmit = (text, time) => {
        console.log(data);
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
                {message.sender ? <Message username={me.username} pic={me.profilePic} message={message} />
                : <Message username={props.data.username} pic={props.data.profilePic} message={message} />}
                
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
            <Button onClick={props.onClick}>X</Button>
            </div>} 
        avatar={<Avatar src={props.data.profilePic}/>} />
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