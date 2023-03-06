import React from "react";
import LoginScreen from "./loginPage";
import HomeScreen from "./homePage";

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
                return (<LoginScreen handler={this.handler} />)
            }
            else {
                return <HomeScreen handler={this.handler} />;
            }
        }
        else {
            return (<h1>This page doesn't exist yet!</h1>)
        }
    }

    handler(ev) {
        if (ev.type==='logged-in') {
            this.setState({logged_in: true});
        }
    }
}