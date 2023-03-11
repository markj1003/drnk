import React from "react";
import useIntervalHook from "./hooks/useIntervalHook";
import store from "./store";
import {getUserStatuses} from "./storeSlices/onlineStatusesSlice";
import SelectNavBar from "./selectNavBar";

export default function HomePage() {
    useIntervalHook(() => {
        store.dispatch(getUserStatuses());
    }, 120000);

    return (
        <>
            <SelectNavBar />
        </>
    );
}