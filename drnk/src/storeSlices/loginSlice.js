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
            console.log(action)
            state.loggedIn = true;
            state.token = action.session
            state.Username = action.username
        },
        setLoggedOut: (state, _) => {
            state.loggedIn = false;
            state.token = null;
            state.Username = null;
        }
    }});

export const { setLoggedIn, setLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;