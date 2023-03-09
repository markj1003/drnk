import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit";
import onlineStatuses from './storeSlices/onlineStatusesSlice';

const rootReducer = combineReducers({onlineStatuses});

export default configureStore({
    reducer: rootReducer
});