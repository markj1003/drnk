import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import SampleFeedLang from '../assets/sampleFeedPic.jpg';
import SampleFeedEnner from '../assets/sampleFeedEnner.jpg';
import ProfilePicLang from '../assets/aboutPhotos/lang.jpg';
import ProfilePicEnnis from '../assets/aboutPhotos/enner.jpg';

const feedAdapter = createEntityAdapter();
const initialState = feedAdapter.getInitialState();
export const feedSelector = feedAdapter.getSelectors(state=>state.feed);

//ignores the params since it's fake anyway
function getFakeFeed(username, start, end) {
    const newFeed = [{
        name: 'Liam Lang',
        time: '2 hours',
        caption: 'God I love a love a tasty pint',
        image: SampleFeedLang,
        profile: ProfilePicLang,
        id: nanoid()
    },
    {
        name: 'William Ennis',
        time: '4 hours',
        caption: "Pimping ain’t easy but somebody’s gotta do it",
        image: SampleFeedEnner,
        profile: ProfilePicEnnis,
        id: nanoid()
    }];
    return newFeed;
}

//filters: username or minLength
export const getFeed = createAsyncThunk('feed/getFeed', (filters={}, thunkAPI) => {
    var currentFeed = feedSelector.selectAll(thunkAPI.getState());
    let newFeed;
    if (filters.username) {
        currentFeed = currentFeed.filter(f => f.username === filters.username);
    }
    if (filters.minLength || currentFeed.length === 0) {
        if (currentFeed.length < (filters.minLength||1)) {
            //fetch more from server
            console.log('fetching feed from server');
            newFeed = currentFeed.concat(getFakeFeed(filters.username, 0, 2));
        }
    }
    return newFeed;
})

export const feed = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addToFeed(state, action) {
            //remove
        }
    },
    extraReducers(builder) {
        builder.addCase(getFeed.fulfilled, (state, action) => {
            if (action.payload) {
                feedAdapter.setMany(state, action.payload)
            }
        })
    }
})
export const {addToFeed} = feed.actions;
export default feed.reducer;

