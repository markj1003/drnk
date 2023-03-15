import Dropdown from "react-bootstrap/Dropdown";
import SettingsIcon from "@mui/icons-material/Settings";
import './userOptions.css';
import {useEffect, useState} from 'react';

export default function UserOptions(props) {
        return <Dropdown>
                <Dropdown.Toggle  >
                        <SettingsIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu popperConfig={{}} role="menu" className="popup">
                        <Dropdown.Item
                         onClick={() => props.onClick(props.username)}>View user profile</Dropdown.Item>
                        <Dropdown.Item>Remove friend</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
}