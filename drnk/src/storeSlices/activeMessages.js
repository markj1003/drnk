import { createSlice } from "@reduxjs/toolkit";
export const activeMessages = createSlice({
    name: 'activeMessages',
    initialState: [],
    reducers: {
        addMessager: (state, action)=> {
            if (state.includes(action.payload)) {
                return
            }
            state.push(action.payload);
        },
        removeMessager: (state, action)=> {
            if (state.includes(action.payload)) {
                const index = state.indexOf(action.payload);
                state.splice(index, 1);
            };
        }
    }
})

export const { addMessager, removeMessager } = activeMessages.actions;
export default activeMessages.reducer;

