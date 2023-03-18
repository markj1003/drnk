import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
export const feed = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addToFeed: (state, action)=> {
            for (let item of action.payload) {
                state.push(item);
            }
            state.sort((a,b)=>b.timestamp-a.timestamp);
            console.log(current(state));
        },
    }
})

export const { addToFeed } = feed.actions;
export default feed.reducer;

