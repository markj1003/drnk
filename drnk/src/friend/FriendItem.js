import React from "react";


export default function FriendItem(props) {
    return <div className={"friendItem"}>
        <img className={"friendPP"} src="/default_pp.gif"/>
        <p> {props.username} </p>
        <OnlineStatus online={props.status} />
        {/*<img className={"friendOnlineStatus"} src={props.status ? "/online.gif" : "/offline.gif"}/>*/}
    </div>
}

export function OnlineStatus(props) {
    return <span style={{color: props.online ? "green" : "red"}}>●</span>
}