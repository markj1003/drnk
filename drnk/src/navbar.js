import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import UserPic from './assets/default_profile.svg';
import './navbar.css';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function SiteNavBar() {
    const loggedIn = useSelector((state) => state.login.loggedIn);
    const navigate = useNavigate();
    const onClick = (ev) => {
        navigate("/");
    }
    return (
        <NavBar className="bg-dark" >
            <Container fluid className='px-3'>
                <NavBar.Brand onClick={onClick}
                              name="welcome" className="text-primary clickable">onlyDrinks</NavBar.Brand>
                <NavBar.Collapse className="justify-content-end">
                    <UserInfoNavBar loggedIn={loggedIn} />
                </NavBar.Collapse>
            </Container>
        </NavBar>
    );
}

function UserInfoNavBar(props) {
    if (props.loggedIn) {
        return (
            <div className='user-tab d-flex justify-content-between align-items-center clickable'>
                <Image src={UserPic} className='user-img' />
                <p>  _ </p>
                <NavBar.Text className='text-primary' onClick={(ev) => this.userClick({type:'user'})}>
                    Kwang</NavBar.Text>
            </div>)
    }
    else {
        return <NavBar.Text className='text-primary clickable' onClick={this.userClick}>Log in or sign up!</NavBar.Text>
    }
}