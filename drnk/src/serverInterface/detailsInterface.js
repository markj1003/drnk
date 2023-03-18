import store from '../storeSlices/store';
import {addFriend} from '../storeSlices/friendsSlice';
import Joyal from '../assets/aboutPhotos/joyal.jpg';
import Lang from '../assets/aboutPhotos/lang.jpg';
import Ruaridh from '../assets/aboutPhotos/ruaridh.jpg';
import defaultPic from '../assets/default_profile.svg';
const pics = {Liam: Lang,
    Joyal: Joyal,
    Ruaridh: Ruaridh}

export default function getFriend(username) {
    const friend = store.getState().friends[username];
    if (!friend) {
        const details = RetrieveFriendDetails(username);
        store.dispatch(addFriend(details));
        return details;
    }
    return RetrieveFriendDetails(username);
}

function RetrieveFriendDetails(username) {
    return {
        username: username,
        pic: (pics[username] ? pics[username] : defaultPic),
        messages: messageHistory(username)
    }
}

function messageHistory(username) {
    if (username==='Liam') {
        return [{sender: 0, message:'a few beers?', time:'16:58'}, {sender: 1, message:'surely', time:'17:00'}];
    }
    if (username==='Joyal') {
        return [{sender: 1, message: 'coming out?', time:'20:00'}, {sender: 0, message:'never', time: '20:30'}]
    }
    else return [{sender: 0, message: "I don't exist", time: '13:00'}]
}