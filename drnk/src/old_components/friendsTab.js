import React from "react";
import defaultPic from './assets/default_profile.svg'
import optionPic from './assets/options.svg'
import './friendsTab.css'
import template from './tabTemplate'

class FriendTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name||'drinker',
            picture: props.pic||defaultPic
        };
    }

    render() {
        let name=this.state.name;
        return(
            <div name={name} className="friend-tile" onClick={(ev)=>this.handler(ev)}>
                <img name={name} className="friend-picture" src={this.state.picture}></img>
                <div>
                    <p name={name} className="friend-name">{this.state.name}</p>
                </div>
                <img name={name} className="option-picture" src={optionPic}></img>
            </div>
        )
    }

    handler(ev) {
        ev.name = this.state.name;
        this.props.handler(ev);
    }
}

class FriendPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [['Kwang', defaultPic], ['Mingy', defaultPic]]
        }
    }

    render() {
        return (<div className="friend-pane">
            {this.state.friends.map((friend)=>
                (<FriendTile name={friend[0]} pic={friend[1]} key={friend[0]} handler={this.handler}/>))}
        </div>)
    }

    handler(ev) {
        console.log(ev.name);
    }


}

class FriendSearch extends React.Component {
    render() {
        return (<div className="search-div">
            <div className="search-label-div"><p className="search-label">Search for friends!</p></div>
            <div className="search-box-div">
                <input className="search-box"></input>
                <input type="button" className="search-button" value="Search"></input>
            </div>

        </div>)
    }
}

/*
export default class FriendTab extends React.Component {
    render() {
        return (<div className="friend-tab">
            <FriendSearch></FriendSearch>
            <FriendPane></FriendPane>
            </div>)
    }
}
*/

export default class FriendTab extends template {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Your friends:',
            prompt: 'Search for friends:'
        }
    }

    render() {
        return (<div className='fix-width'>
            {super.render()}
        </div>)
    }
}

