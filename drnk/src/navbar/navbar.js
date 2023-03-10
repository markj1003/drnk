import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import UserPic from '../assets/default_profile.svg';
import './navbar.css';

export default class SiteNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.loadUser = this.loadUser.bind(this);
        this.userClick = this.userClick.bind(this);
    }

    render() {
        return <NavBar className="bg-dark" >
            <Container fluid className='px-3'>
                <NavBar.Brand onClick={(ev) => this.userClick({type:'welcome'})} 
                    name="welcome" className="text-primary clickable">onlyDrinks</NavBar.Brand>
                <NavBar.Collapse className="justify-content-end">
                    {this.loadUser()}
                </NavBar.Collapse>
            </Container>
        </NavBar>
    }

    //loadUser is separated out so we can modify this component based on the user more easily
    //just a placeholder kwang for now
    loadUser() {
        if (this.props.loggedIn) {
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

    //presumably we'll want a dropdown for logged in users eventually, for now it tries to direct them to their account homepage
    userClick(ev) {
        console.log(ev);
        if (this.props.loggedIn && ev.type === 'user') {
            this.props.clickHandler({type:'userHome'});
        }
        else {
            this.props.clickHandler({type:'welcome'});
        }
    }
}