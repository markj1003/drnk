import React, { useEffect, useState } from "react";
import { getFriends } from "./storeSlices/friendsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { friendsSelector } from "./storeSlices/friendsSlice";

export default function Test() {
    const [names, setNames] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const onClick = () => {
        dispatch(getFriends('kwang')).then(res => {
            let names = [];
            for (let f of res.payload) {
                names.push(f)
            }
            console.log(names);
        })
    }
    const pullNames = useSelector(friendsSelector.selectAll);
    let displayName = '';
    for (let name of pullNames) {
        displayName += ' ' + name.username;
    }
    return <React.Fragment>
        <h1>Testing Mode</h1>
        <Button onClick={onClick}>Get Feed</Button>
        <h5>{displayName}</h5>
    </React.Fragment>
}
