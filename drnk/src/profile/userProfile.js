import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { ProfileCard, StatsCard, DetailsCard, Rooms, FriendsCard } from './profileComponents';
import './profile.css';
import RoomPic from '../assets/defaultRoomPic.svg';

function getDetails() {
    return {
        Name: 'Kwang Ming Cha',
        Title: 'King of the whisk',
        Description: "If there's whisky and there's a couch to pass out on, I'll be there.",
        Username: 'Kwang',
        Email: 'kwang@mingmail.cha',
        Beverage: 'The grouse'
    }
}

function getAwards() {
    return [{
        title: 'Beverages consumed',
        prog: 250,
        target: 300,
        level: 5
    },
    {
        title: 'Room trophies',
        prog: 5,
        target: 10,
        level: 3
    },
    {
        title: 'Games won',
        prog: 15,
        target: 20,
        level: 4
    },
    {
        title: 'Challenges wom',
        prog: 8,
        target: 10,
        level: 3
    }]
}

function getRooms() {
    return [{
        name: 'onlyDrinks devs',
        desc: 'The developers having a few',
        pic: RoomPic
    },
    {
        name: 'Dublin Delegation',
        desc: 'This way for alcohol poisoning',
        pic: RoomPic
    },
    {
        name: 'Climbers',
        desc: 'A whisky surely?',
        pic: RoomPic
    }

    ]
}


export default function Profile() {
    const isLoggedIn = useSelector((state) => state.login.loggedIn);
    const navigate = useNavigate();
    const [rooms, changeRooms] = useState(getRooms());
    const [details, changeDetails] = useState(getDetails());
    if (!isLoggedIn) {
        return <Stack className="align-middle w-100">
            <div className="text-center text-primary"><h1>Not logged in!</h1></div>
            <div className="text-center"><h4>Please log in to view your profile</h4></div>
            <div className="d-flex justify-content-center pt-3">
                <Button onClick={()=>navigate('/auth/login')}>Log in</Button>
            </div>
            </Stack>
    }
    
    const awards = getAwards();
    
    const onChange = (newDetails) => {
        changeDetails(newDetails);
    }
    const removeRoom = (name) => {
        let id = -1;
        for (let r in rooms) {
            if (rooms[r].name === name) id = r;
            break;
        }
        if (id >= 0) {
            changeRooms(rooms.filter((v, index) => index != id));
        }
    }
    return <div className="container profile-main" >
            <div className="row">
                <div className="col-md-5 mb-3">
                <ProfileCard details={details} isUser='true' />
                <StatsCard awards={awards} />
                <FriendsCard />
                </div>
                <div className="col-md-7">
                <DetailsCard details={details} isUser='true' onChange={onChange} />
                <Rooms rooms={rooms} removeRoom={removeRoom} />
                </div>
                </div>
            </div>
}