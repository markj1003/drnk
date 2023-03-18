import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit";
import onlineStatuses from './onlineStatusesSlice';
import login from './loginSlice';
import activeMessages from './activeMessages';
import friends from './friendsSlice';
import feed from './feedSlice';

const rootReducer = combineReducers({login, onlineStatuses, activeMessages, friends, feed});

export default configureStore({
    reducer: rootReducer
});