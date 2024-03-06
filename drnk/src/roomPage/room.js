import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function RoomPlaceholder() {
    const navigate = useNavigate()
    return <React.Fragment>
        <h1>in progress, please drink</h1>
        <Button onClick={()=>navigate('/roulette')}>Play roulette</Button>
        </React.Fragment>
}