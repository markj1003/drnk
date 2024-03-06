import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { feedSelector } from "./feedSlice";
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import Mark from '../assets/aboutPhotos/mark.jpg';
import Joyal from '../assets/aboutPhotos/joyal.jpg';
import Liam from '../assets/aboutPhotos/lang.jpg';

function getFakeFriends(username='') {
    if (username==='') {
        return [
            {username: 'Ruaridh',
            online: false,
            pic: Ruaridh},
            {username: 'Joyal',
            online: true,
            pic: Joyal},
            {username: 'Mark',
            online: true,
            pic: Mark},
            {username: 'Liam',
            online: false,
            pic: Liam},
            {username: 'Kwang',
            online: true,
            pic: false}]
    }
    return [{
        username: username,
        online: false,
        pic: Joyal
    }]
}

const friendsAdapter = createEntityAdapter({
    selectId: (item) => item.username
})
const initialState = friendsAdapter.getInitialState({
    status: 'idle',
    error: null
})
export const friendsSelector = friendsAdapter.getSelectors(state=>state.friends);

export const getFriends = createAsyncThunk('friends/getFriends', (username='', thunkAPI) => {
    const state = thunkAPI.getState().friends
    const status = state.status;
    if (status === 'idle') {
        //get all friends from server
        var friends = getFakeFriends();
    }
    else {
        if (username==='') {
            var friends = Object.values(state.entities);
        }
        else {
            const existingFriends = state.ids;
            if (!(existingFriends.includes(username))) {
                //pull this user from server
                var friends = getFakeFriends(username);
            }
            else {
                var friends = [state.entities[username]]
            }
        }
    }
    console.log(friends);
    return friends;
})

export const friends = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        addFriend: (state, action)=> {
        },
        addFriends: (state, action)=> {
        },
        updateFriends: (state, action)=> {
        }
    },
    extraReducers(builder) {
        builder.addCase(getFriends.fulfilled, (state, action) => {
            state.status = 'complete';
            if (action.payload.length > 0)
                friendsAdapter.setMany(state, action.payload);
        })
    }
})

export const { addFriend, addFriends, updateFriends } = friends.actions;
export default friends.reducer;

