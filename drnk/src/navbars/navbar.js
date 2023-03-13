import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import UserPic from '../assets/default_profile.svg';
import './navbar.css';
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Beer from '../assets/beerLogo';
import { logout } from '../interface';

function SiteNavBar() {
    const loggedIn = useSelector((state) => state.login.loggedIn);
    const navigate = useNavigate();
    const onClick = (ev) => {
        navigate("/");
    }
    return (
        <NavBar className="bg-dark" >
            <Container fluid className='px-3'>
                    <OnlyDrinksLogo onClick={onClick} />
                <NavBar.Collapse className="justify-content-end">
                    <UserInfoNavBar onClick={onClick} loggedIn={loggedIn} />
                </NavBar.Collapse>
            </Container>
        </NavBar>
    );
}
 
//todo: this doesn't scale to different viewport sizes
function OnlyDrinksLogo(props) {
    return (
    <NavBar.Brand onClick={props.onClick}
        name="welcome" className="text-primary clickable d-flex justify-content-center">
            <Beer size='logo' /> 
            <div className='pt-1'>
                <span >onlyDrinks</span>
            </div>
            </NavBar.Brand>
    )
} 

function UserInfoNavBar(props) {
    const navigate = useNavigate();
    
    if (props.loggedIn) {
        return (
           <Dropdown drop='start'>
                <Dropdown.Toggle className="pr-2 user-tab d-flex justify-content-between align-items-center">
                    <Image src={UserPic} className='pr-2 user-img' />
                        Kwang
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/profile')}>View profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/aboutUs')}>About onlyDrinks</Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>)
    }
    else {
        return <NavBar.Text onClick={props.onClick} className='text-primary clickable'>Log in or sign up!</NavBar.Text>
    }
}

export default function NavbarWrapper() {
    return (
        <div className={"root"}>
            <SiteNavBar />
            <Outlet />
        </div>
    );
}