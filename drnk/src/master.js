import React from "react";
import LoginPage from "./loginPageBS";
import HomePage from "./homePageBS";

export default class Master extends React.Component {
    constructor(props) {
        super(props)
        //todo: check if logged in with server
        this.state = {
            logged_in: false,
            target: '/'
        }
        this.handler = this.handler.bind(this);
    }

    render() {
        if (this.state.target === '/') {
            if (!this.state.logged_in) {
                return (<LoginPage handler={this.handler} />)
            }
            else {
                return <HomePage handler={this.handler} />;
            }
        }
        else {
            return (<h1>This page doesn't exist yet!</h1>)
        }
    }

    handler(ev) {
        if (ev.type==='login') {
            this.setState({logged_in: true});
            this.setState({token: ev.token})
        }
    }
}