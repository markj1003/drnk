import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit";
import onlineStatuses from './storeSlices/onlineStatusesSlice';
import login from './storeSlices/loginSlice';

const rootReducer = combineReducers({login, onlineStatuses});

export default configureStore({
    reducer: rootReducer
});