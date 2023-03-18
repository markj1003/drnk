import React from "react";
import useIntervalHook from "../hooks/useIntervalHook";
import store from "../storeSlices/store";
import {getUserStatuses} from "../storeSlices/onlineStatusesSlice";
import SelectNavBar from "../navbars/selectNavBar";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Feed from './feed';

export default function HomePage() {
    useIntervalHook(() => {
        store.dispatch(getUserStatuses());
    }, 120000);
    const navigate = useNavigate();
    return (
        <Container className="pt-3">
            <Feed />
        </Container>
    );
}