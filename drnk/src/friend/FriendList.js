import FriendItem from "./FriendItem";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Divider from '@mui/material/Divider';
import './FriendList.css';
import {useEffect, useState} from 'react';
import { connect, useDispatch } from "react-redux";
import { getFriends } from "../storeSlices/friendsSlice";


function mapStateToProps(state) {
    const friends = state.friends.entities;
    return {friends: friends};
}

function FriendList(props) {
    const dispatch = useDispatch();
    const filter = props.filter ? props.filter : '';
    useEffect(() => {
        console.log('here')
        dispatch(getFriends());
    }, [])
    const friendArray = Object.values(props.friends);
    if (friendArray.length > 0) {
        return <Stack className="stack-profile">
            {friendArray
            .map((friend) => friend.username.toLowerCase().includes(filter) ? 
                <FriendItem small={props.small} className='border-all' onClick={props.onClick} 
                key={friend.username} username={friend.username} pic={friend.pic} status={friend.online} /> 
                : '')}
            <Divider className='bg-dark' />
        </Stack>
    }
    return <p>awaiting friends...</p>
}

export default connect(mapStateToProps)(FriendList);