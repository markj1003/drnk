import Popover from "@mui/material/Popover";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button"
import {useState} from 'react';
import store from '../storeSlices/store';
import { addMessager } from "../storeSlices/activeMessages";
import { useNavigate } from "react-router-dom";
//props: anchor, onClose, username, onClick (handle locally?)
export default function UserClick(props) {
    const navigate = useNavigate();
    const onProfile = () => {
        navigate('/u/'+props.username);
        props.onClose();
    }
    const onMessage = () => {
        store.dispatch(addMessager(props.username));
        props.onClose();
    }
    const onChallenge = () => {
        props.onClose();
    }
    return <Popover
        open={Boolean(props.anchor)}
        anchorEl={props.anchor}
        onClose={props.onClose}
        anchorOrigin={{vertical: 'bottom',
            horizontal: 'center'}}
        >
            <ButtonGroup variant='solid' orientation="vertical">
                {props.profile ? <Button onClick={onProfile}>View profile</Button> : ''}
                {!props.nomsg ? <Button onClick={onMessage}>Send message</Button> : ''}
                <Button onClick={onChallenge}>Challenge!</Button>
            </ButtonGroup>
    </Popover>

}