import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import UserPic from './assets/default_profile.svg';
import './navbar.css';
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import {OnlineStatus} from "./friend/FriendItem";
import {toggleAppearOffline} from "./storeSlices/onlineStatusesSlice";
import store from "./store";
import {setLoggedOut} from "./storeSlices/loginSlice";

function SiteNavBar() {
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
 {/*<div 
        className='user-tab d-flex justify-content-between align-items-center clickable'> */}
            

function UserInfoNavBar(props) {
    const appearOffline = useSelector((state) => state.onlineStatuses.appearOffline)
    const logOut = () => {
        store.dispatch(setLoggedOut());
        if (appearOffline) {
            store.dispatch(toggleAppearOffline());
        }
    }
    if (props.loggedIn) {
        return (
           <Dropdown drop='start'>
                <Dropdown.Toggle className="pr-2 user-tab d-flex justify-content-between align-items-center">
                    <Image src={UserPic} className='pr-2 user-img' />
                    <OnlineStatus online={props.loggedIn && !appearOffline} />
                        Kwang

                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>View profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => store.dispatch(toggleAppearOffline())}>Appear {appearOffline ? "Online" : "Offline"} </Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>)
    }
    else {
        return <NavBar.Text className='text-primary clickable'>Log in or sign up!</NavBar.Text>
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