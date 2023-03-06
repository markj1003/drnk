import React from "react";
import "./banner.css"
import defaultPic from "./assets/default_profile.svg"
import {useRef} from "react";

class UserCorner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name||'drinker',
            picture: props.picture||defaultPic
        }
    }
    
    render() {
        return (<div className="user-corner" onClick={this.props.handler}>
            <p className="user-name">{this.state.name}</p>
            <img src={this.state.picture} className="user-picture"></img>
        </div>)
    }
}

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dimensions: 0};
        this.handler = this.handler.bind(this);
    }
    render() {
        return <div className="banner">
            <h1 className="title" id="header">Welcome to onlyDrinks!</h1>
            <UserCorner handler={this.handler} />
            </div>
    }

    handler(ev) {
        console.log(ev.type);
    }

    componentDidMount() {
        this.setState({
            dimensions: this.container
            });
        }
}