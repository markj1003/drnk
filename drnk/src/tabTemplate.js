import React from "react";
import defaultPic from './assets/default_profile.svg'
import optionPic from './assets/options.svg'
import './tabTemplate.css'

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name||'drinker',
            picture: props.pic||defaultPic,
            id: props.id
        };
    }

    render() {
        let name=this.state.name;
        return(
            <div name={name} className="tile" onClick={(ev)=>this.handler(ev)}>
                <img name={name} className="picture" src={this.state.picture}></img>
                <div>
                    <p id={this.state.id} name={name} className="name">{this.state.name}</p>
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

class Pane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: props.tiles,
            id: props.id
        }
        this.handler = this.handler.bind(this);
    }

    render() {
        return (<div className="pane" id={this.state.id}>
            {this.state.tiles.map((tile)=>
                (<Tile name={tile[0]} pic={tile[1]} key={tile[0]} 
                id={tile[0]} handler={this.handler}/>))}
        </div>)
    }

    handler(ev) {
        console.log(ev.name);
    }


}

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompt: props.prompt||'Search'
        }
    }
    render() {
        return (<div className="search-div">
            <div className="search-label-div">
                <p className="search-label" >
                    {this.state.prompt}
                </p>
            </div>
            <div className="search-box-div">
                <input className="search-box"></input>
                <input type="button" className="search-button" value="Search"></input>
            </div>

        </div>)
    }
}

class TabHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            header: props.header||'Tab'
        }
    }
    render() {
        return (<div className='tab-header'>
            <p className='update-head-text'>{this.state.header} </p>
        </div>)
    }
}


export default class Tab extends React.Component {
    constructor(props) {
        super(props)
        this.placeholder = this.placeholder.bind(this);
        this.state = {
            header: props.header||'Tab',
            prompt: props.prompt||'Search'
        }
        this.tileGetter =  props.getter||this.placeholder;
    }
    render() {
        let tiles = this.tileGetter();
        return (<div className="tab">
            <TabHeader header={this.state.header} />
            <Pane id={this.state.header} tiles={tiles}></Pane>
            <Search prompt={this.state.prompt}></Search>
            </div>)
    }

    placeholder() {
        return [['Kwang', defaultPic], ['MingoCoin', defaultPic]];
    }
}


