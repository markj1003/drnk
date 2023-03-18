import { createSlice } from "@reduxjs/toolkit";
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg'
export const friends = createSlice({
    name: 'friends',
    initialState: {}
    ,
    reducers: {
        addFriend: (state, action)=> {
            const existing = {...state[action.payload.username]};
            if (Object.keys(existing).includes('username')) {
                return;
            }
            else {
                state[action.payload.username] = action.payload;
            }
        },
        addFriends: (state, action)=> {
            const existing = {...state};
            for (let friend of action.payload) {
                if (Object.keys(existing).includes('username')) {
                    //nothing
                }
                else {
                    state[friend.username] = friend;
                }
            }
        },
        updateFriends: (state, action)=> {
            const existing = {...state};
            for (let friend of action.payload) {
                if (Object.keys(existing).includes('username')) {
                    state[friend.username] = {...existing[friend.username], friend};
                }
                else {
                    state[friend.username] = friend;
                }
            }
        }
    }
})

export const { addFriend, addFriends, updateFriends } = friends.actions;
export default friends.reducer;

