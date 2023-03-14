import {createSlice} from '@reduxjs/toolkit';
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        token: null,
        Username: null
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = true;
            state.token = action.payload.token;
            state.Username = action.payload.Username;
        },
        setLoggedOut: (state, _) => {
            state.loggedIn = false;
            state.token = null;
            state.Username = null;
        }
    }});

export const { setLoggedIn, setLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;