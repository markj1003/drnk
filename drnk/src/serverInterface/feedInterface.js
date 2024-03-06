import { addToFeed } from "../storeSlices/feedSlice"
import store from "../storeSlices/store"
import { nanoid } from "@reduxjs/toolkit";
import SampleFeedLang from '../assets/sampleFeedPic.jpg';
import SampleFeedEnner from '../assets/sampleFeedEnner.jpg';
import ProfilePicLang from '../assets/aboutPhotos/lang.jpg';
import ProfilePicEnnis from '../assets/aboutPhotos/enner.jpg';

function getFiltered(filterRule=false) {
    var data = store.getState().feed;
    if (filterRule) {
        data = data.feed.filter((item) => {
            let include = true;
            for(let pred of filterRule.keys()) {
                if (item[pred] !== filterRule[pred]) {
                    include = false;
                }
                return include;
            }
        })
    }
    return data;
}

export default function getFeedData(require, filterRule=false) {
    let feed = [{
            name: 'Liam Lang'+require,
            time: '2 hours',
            caption: 'God I love a love a tasty pint',
            image: SampleFeedLang,
            profile: ProfilePicLang,
            id: nanoid()
        },
        {
            name: 'William Ennis'+require,
            time: '4 hours',
            caption: "Pimping ain’t easy but somebody’s gotta do it",
            image: SampleFeedEnner,
            profile: ProfilePicEnnis,
            id: nanoid()
        }]
    store.dispatch(addToFeed(feed));
    feed = feed.concat(getFiltered(filterRule));
    console.log(store.getState());
    return feed;
}