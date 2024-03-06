import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getActiveMessages = createAsyncThunk('activeMessages/getActiveMessages', 
    async () => {
        //connect this to the server API
        return ['Ruaridh', 'Liam'];
})

export const addMessager = createAsyncThunk('activeMessages/addMessager',
    async (username, thunkAPI) => {
        const state = thunkAPI.getState().activeMessages;
        if (!state.includes(username)) {
            //send to server
            console.log('sending active messager to server');
        }
        return username;
})

export const removeMessager = createAsyncThunk('activeMessages/removeMessager',
    async (username, thunkAPI) => {
        const state = thunkAPI.getState().activeMessages;
        if (state.includes(username)) {
            //send to server
            console.log('sending remove messager to server');
        }
        return username;
})

export const activeMessages = createSlice({
    name: 'activeMessages',
    initialState: [],
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getActiveMessages.fulfilled, (state, action) => {
            for (let messager of action.payload) {
                if (!state.includes(messager)) {
                    state.push(messager);
                }
            }
        })
        .addCase(addMessager.fulfilled, (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        })
        .addCase(removeMessager.fulfilled, (state, action) => {
            if (state.includes(action.payload)) {
                const index = state.indexOf(action.payload);
                state.splice(index, 1);
            };
        })
    }
})

export default activeMessages.reducer;

