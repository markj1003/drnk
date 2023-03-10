import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getUserStatuses = createAsyncThunk(
    'users/getOnlineStatuses',
    async (args, { rejectWithValue}) => {
        return fetch(
            // todo: this is a temporary mock server. Replace with server endpoint url for online statuses when done
            `https://3ee3c178-6e28-4ea3-b9d5-588358d9ee68.mock.pstmn.io/localhost:3000/online`
            ).then((res) => {
                if (!res.ok) {
                    return rejectWithValue([], "Response from server is invalid. ");
                }
                return res.json();
        }).catch(error => {
            return rejectWithValue([], error);
        })

    }
);

export const onlineStatusesSlice = createSlice({
    name: 'onlineStatuses',
    initialState: {
        loadingStatus: null,
        "appearOffline": false,
        friendStatuses: {}
    },
    reducers: {
        setOnline: (state, _) => {
            state.myUserName = 1
        },
        setOffline: (state, _) => {
            state.myUserName = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserStatuses.pending, (state, _) => {
                state.loadingStatus = 'loading'
            })
            .addCase(getUserStatuses.fulfilled, (state, payload) => {
                state.friendStatuses = payload.payload
                state.loadingStatus = 'success'
            })
            .addCase(getUserStatuses.rejected, (state, _) => {
                state.loadingStatus = 'failed'
            })
    }
    });

export const { setOnline, setOffline } = onlineStatusesSlice.actions;
export default onlineStatusesSlice.reducer;