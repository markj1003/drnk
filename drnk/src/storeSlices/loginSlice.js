import {createSlice} from '@reduxjs/toolkit';
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: true,
        token: null
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = true;
            state.token = action.payload;
        },
        setLoggedOut: (state, _) => {
            state.loggedOut = false;
            state.token = null;
        }
    }});

export const { setLoggedIn, setLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;