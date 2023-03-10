import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import logo from '../assets/logo.svg';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./loginPageBS.css"
import { new_account, reset, log_in } from "../shared_components/interface";
import SiteNavbar from "../navbar/navbar";

/*
NOTE: message passing is not consistent here. some functions still pass bare strings,
this is stupid and every message should be an object going forward, I'll fix this soon
but it's not really a priority since the login page components shouldn't be needed outside
of the login page and the only communication with the rest of the app should be through 
the master LoginPage 
*/


//non-interactive welcome splash
class WelcomeInfo extends React.Component {
    render() {
        return <Container className="text-dark container-fluid text-center p-0">
            <Stack className="p-0 d-flex justify-content-center">
                <h1 className="text-primary main-header">onlyDrinks</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <h3>Welcome to a world of better beverages!</h3>
            </Stack>
        </Container>
    }
}

//option buttons for welcome splash
//bare string passing
class LoginButtons extends React.Component {
    render() {
        return <Container className="d-flex justify-content-center">
            <Stack direction="horizontal" gap={3}>
                <Button size='lg' name='login' onClick={(ev) => this.clickHandler(ev)}>Log in</Button>
                <Button size='lg' name='signup' onClick={(ev) => this.clickHandler(ev)}>Sign up</Button>
            </Stack>
        </Container>
    }

    clickHandler(ev) {
        this.props.clickHandler(ev.target.name);
    }
}

//template for form items
//children can use initialise method to create a form with arbitrary prompts 
//they need to handle their own submission using onSubmit
class FormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    render() {
        return <div className="pt-5 b-5 w-100 justify-content-center">
                <Card className="text-dark w-card h-100 container-fluid text-center bg-card">
            {this.getForm()}
        </Card>
        </div>
    }

    getForm() {
        return (
        <Container>
        <Row className="justify-content-center">
            <Col md={{span: 10}}>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="text-primary">{this.state.prompt}</h1>
                    {this.state.items.map((item)=>(
                        <Form.Group className="mb-4" key={item[1]}>
                        <Form.Label>{item[0]}</Form.Label>
                        <Form.Control name={item[1]} placeholder={"Enter " +  item[1]}
                        value={this.state[item[1]]} onChange={this.handleChange}  />
                    </Form.Group>  ))}
                    {/* it's a bit hacky to just repeat the header prompt as the submit button */}
                    <Button type="submit" className="btn btn-primary btn-block mb-2">{this.state.prompt}</Button>
                </Form>
            </Col>
        </Row>
    </Container>);
    }

    //just stops a reload and resets the form
    //since state changes are batched children can still use the content after calling super
    onSubmit(ev) {
        ev.preventDefault();
        console.log(this.state);
        this.reset_form();

    }

    handleChange(ev) {
        this.setState({[ev.target.name]: ev.target.value})
    }

    //INPUTS:   prompt (str)- the heading on the form
    //          names (Array[str])- a list of details to include in form
    //          initialises the state of the object
    initialise(prompt, names) {
        let theItems = []
        let theStates = {}
        for (let name of names) {
            let id = name.split(':')[0]
            theItems.push([name, id]);
            theStates[id] = '';
        }
        this.state = ({prompt: prompt, items: theItems});
    }

    reset_form () {
        for (let item of this.state.items) {
            this.setState({[item[1]]: ''})
        }
    }

    //when a clickable other than submit is triggered, reset the form and pass the message to the parents
    //extra clickables (eg. forget password) should be rendered by children
    clickHandler(name) {
        this.reset_form();
        this.props.clickHandler(name);
    }
}

class SignupForm extends FormTemplate {
    constructor(props) {
        super(props);
        this.initialise('Sign up', ['Username:', 'Email:',  'Password:', 'Confirm Password:']);
    }

    getForm() {
        return (
            <div>
                {super.getForm()}
                <Row className="justify-content-center">
                    <Col>
                        <div className='text-center mb-4'>
                            <a href='#' className="text-primary" name="login" onClick={(ev)=>this.clickHandler(ev.target.name)}>Already have an account?</a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    onSubmit(ev) {
        super.onSubmit(ev);
        console.log('hi');
        if (this.state['Password'] != this.state['Confirm Password']) {
            console.log("passwords don't match");
            return;
        }
        let outcome = new_account(this.state.Username, this.state.Password);
        if (outcome) {
        this.props.loginHandler(outcome);
        }
    }
    
}

class LoginForm extends FormTemplate {
    constructor(props) {
        super(props);
        this.initialise('Log in ', ['Username:', 'Password:']);
    }

    getForm() {
        return (
            <div>
                {super.getForm()}
                <Row className="justify-content-center">
                    <Col>
                        <a className='link-primary' href='#' name="reset" onClick={(ev)=>this.props.clickHandler(ev.target.name)}> Forgot password? </a>
                    </Col>
                    <Col>
                        <div className='text-center mb-4'>
                            <a className='link-primary' href='#' name="signup" onClick={(ev)=>this.props.clickHandler(ev.target.name)}>Don't have an account?</a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    async onSubmit(ev) {
        super.onSubmit(ev);
        let outcome = await log_in(this.state.Username, this.state.Password);
        if (outcome) {
        this.props.loginHandler(outcome);
        }
    }
}

class ResetForm extends FormTemplate {
    constructor(props) {
        super(props);
        this.initialise('Reset password', ['Username:']);
    }

    getForm() {
        return (
            <div>
                {super.getForm()}
                <Row className="justify-content-center">
                    <Col>
                        <a className='link-primary' href='#' name="login" onClick={(ev)=>this.props.clickHandler(ev.target.name)}> Remember your password? </a>
                    </Col>
                    <Col>
                        <div className='text-center mb-4'>
                            <a className='link-primary' href='#' name="signup" onClick={(ev)=>this.props.clickHandler(ev.target.name)}>Don't have an account?</a>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
}

class MainPane extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    render() {
        return <Stack gap={-1} className='justify-content-center h-100'>
            <Container className=" h-75 w-100">
            {this.getPane(this.props.pane)}
            </Container>
        </Stack>
    }

    //uses a tab container to provide the current context depending on active pane
    getPane(pane) {
        return (
            <Tab.Container activeKey={pane} className="pt-2 w-100 bg-dark">
                <Tab.Content className="d-flex justify-content-center">
                    <Tab.Pane eventKey="welcome">
                        <WelcomeInfo />
                        <LoginButtons clickHandler={this.clickHandler} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="login">
                        <LoginForm clickHandler={this.clickHandler} loginHandler={this.props.loginHandler}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                        <SignupForm clickHandler={this.clickHandler} loginHandler={this.props.loginHandler} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="reset">
                        <ResetForm clickHandler={this.clickHandler} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        );

    }

    //fixes the message passing shitshow by passing an object from here up
    clickHandler(name) {
        this.props.clickHandler({type: name});
    }

    //the token was supposed to be passed from here but we'll move this to the redux store
    loginHandler(token) {
        this.props.loginHandler(token);
    }
}

//master LoginPage component
class LoginPage extends React.Component {
    Panes = {
        Welcome: 'welcome',
        LogIn: 'login',
        SignUp: 'signup',
        Reset: 'reset'
    };

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.state = {
            pane: this.Panes.Welcome
        }
    }

    render() {
        return <Stack className="bg-light d-flex align-top">
            <SiteNavbar clickHandler={this.clickHandler} loggedIn={false} />
            <div className="flex-fill">
            <MainPane loginHandler={this.loginHandler} clickHandler={this.clickHandler} pane={this.state.pane} />
            </div>
        </Stack>
    }

    clickHandler(ev) {
        console.log(ev.type);
        if (Object.values(this.Panes).includes(ev.type)) {
            this.setState({pane: ev.type})
        }
    }

    loginHandler(token) {
        console.log(token);
        this.props.handler({type: 'login', token: token});
    }
}

export default LoginPage;
