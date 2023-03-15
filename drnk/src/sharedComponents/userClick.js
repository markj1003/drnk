import Popover from "@mui/material/Popover";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button"
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
//props: anchor, onClose, username, onClick (handle locally?)
export default function UserClick(props) {
    const navigate = useNavigate();
    const onProfile = () => {
        console.log('h?')
        navigate('/u/'+props.username);
    }
    return <Popover
        open={Boolean(props.anchor)}
        anchorEl={props.anchor}
        onClose={props.onClose}
        anchorOrigin={{vertical: 'bottom'}}
        >
            <ButtonGroup variant='solid' orientation="vertical">
                {props.profile ? <Button onClick={onProfile}>View profile</Button> : ''}
                {!props.nomsg ? <Button onClick={()=>props.onClick(props.username)}>Send message</Button> : ''}
                <Button onClick={()=>props.onClick(props.username)}>Challenge!</Button>
            </ButtonGroup>
    </Popover>

}