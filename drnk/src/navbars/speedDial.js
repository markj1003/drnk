import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddHome from '@mui/icons-material/AddHome';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import PersonAdd from '@mui/icons-material/PersonAdd';
import WineBar from '@mui/icons-material/WineBar';
import Message from '@mui/icons-material/Message';
import './speedDial.css';
import {useState, useEffect} from 'react';
import useIntervalHook from '../hooks/useIntervalHook';
import store from '../storeSlices/store';
import { connect } from 'react-redux';

const actions = [
  { icon: <AddAPhoto />, name: 'New post' },
  { icon: <AddHome />, name: 'Create room' },
  { icon: <PersonAdd />, name: 'Add friend' },
  { icon: <WineBar />, name: 'Challenge someone' },
  { icon: <Message />, name: 'Send a message' }
];

function mapStateToProps(state) {
    return {loginState: state.login }
}

function ActionSpeedDial(props) {
    //we want to hide the speed dial while an offcanvas is visible
    //but checking if an offcanvas is visible too frequently is a big
    //resource drain. we can't use a click listener directly because the 
    //uncertain ordering means the offcanvas won't necessarily render/disappear
    //before the listener is triggered. so we use the click listener to prime
    //the interval hook (for 30ms). the interval hook checks to see if the dial
    //should be visible and sets the interval back to 2 minutes to save resources
    const [isHidden, toggleHidden] = useState(false);
    const [interval, setInterval] = useState(30);
    useIntervalHook(() => {
        const offCanvases = document.getElementsByClassName('offcanvas');
        let hide = false;
        if (offCanvases) {
            for(let c of offCanvases) {
                let classes = c.classList;
                if(Array.from(classes).includes('show')) {
                    hide = true;
                }
            }
        }  
        toggleHidden(hide);
        setInterval(120000);
    }, interval);

    const changeInterval = () => {
        setInterval(30);
    }

    useEffect(() => {
        document.addEventListener('click', changeInterval);
        return () => document.removeEventListener('click', changeInterval);
    })
    const visibility = (isHidden || !props.loginState.loggedIn) ? 'invisible ' : ''
    return (
        <Box>
        <SpeedDial
            size='large'
            className={visibility}
            FabProps={{className: 'bg-primary text-dark'}}
            ariaLabel="SpeedDial"
            sx={{ position: 'fixed', bottom: 65, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
            />
            ))}
        </SpeedDial>
        </Box>
    );
}

export default connect(mapStateToProps)(ActionSpeedDial);