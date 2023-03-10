import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import logo from '../assets/logo.svg';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./homePageBS.css"
import Navbar from 'react-bootstrap/Navbar'
import SiteNavbar from "../navbar/navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import Collapse from "react-bootstrap/esm/Collapse";

let expand = false;

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        //leftClick is an entry point for debugging
        this.leftClick = this.leftClick.bind(this);
        this.state = {
            show: false
        }
    }

    render() {
        return <div>
            <Stack className="bg-light d-flex align-top">
            {/*loggedIn would pass the user details in a deployment build, just set to true for now
                probably we move this to the redux store instead though */}
            <SiteNavbar clickHandler={this.clickHandler} loggedIn={true} />
            <div className="flex-fill">
                {/* the main pane will go here */}
            <p>Hello</p>
            </div>
        </Stack>
        <Navbar key={expand} fixed='bottom' expand={expand} className="bg-light">
          <Container fluid>
            <Navbar.Toggle aria-controls={'tab-right'} children='Friends'
                 id='tab-right-button'
                 />
            {/*yes, leftClick is triggered by the right button... none of this is final anyway so 
             I didn't bother changing it */}
            <button className="navbar-toggler" type="button" onClick={this.leftClick}>
                Rooms
            </button>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
              className='tab-right'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              {/* placeholder Offcanvas body */}
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-false`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            {/* Collapse provides animation utility in react bootstrap
             this Collapse doesn't actually change anything though- I think
            offcanvas unmounts on its own before collapse can do anything about it */}
            <Collapse in={this.state.show} dimension="width" unmountOnExit={true}>
            <div className="myOff offcanvas offcanvas-start" 
                tabIndex="-1" 
                id={'tab-left'}
                aria-labelledby={'tab-left'}
                placement="start" >
                <h1>Testing</h1>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`tab-left-label`}>
                    Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
            </div>
            </Collapse>
          </Container>
        </Navbar>
        </div>
    }

    clickHandler(ev) {
        if (ev.type === 'welcome') {
            console.log('already home');
        }
        if (ev.type === 'userHome') {
            console.log('todo');
        }
    }

    leftClick(ev) {
        const tabLeft = document.getElementById('tab-left');
        // tabRight is the real Offcanvas, by triggering the click here
        // we get a jumping in point for debugging
        const tabRight = document.getElementById('tab-right-button');
        tabRight.click();
        // show controls the fake offCanvas
        this.setState({show: !this.state.show});
    }


}