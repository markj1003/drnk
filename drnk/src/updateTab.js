import React from "react";
import template from './tabTemplate';
import "./updateTab.css";
import plus from "./assets/plus_sign.svg";

class NewRoomTab extends React.Component {
    render() {
        return (<div className='new-room-div'>
            <div className='new-room-text-div'>
                <p className='new-room-text'>Create new room</p>
            </div>
            <img src={plus} className='new-room-picture' />
        </div>)
    }
}

export default class UpdateTab extends template {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Your rooms:',
            prompt: 'Search public rooms: '
        }
    }

    render() {
        return <div class='fix-width'>{super.render()}
        <div className="filler"></div>
            <NewRoomTab />
        </div>
            
            ;

    }
}