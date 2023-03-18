import RoomPic from '../assets/defaultRoomPic.svg';
import Cookies from 'universal-cookie';
import store from '../storeSlices/store';
import { setLoggedIn } from '../storeSlices/loginSlice';
const dummy = true;

export async function log_in(username, password) {
    console.log('Attempted log-in with: ' + username, password);
    if (!dummy) {
        let res = await fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            } ,
            body: JSON.stringify({username: username, 
                password: password,
                type: 'login'})
        })
        let worked = await res.json();
        return worked.worked; 
    }
    else {
        if (username==='kwang') {
            const cookies = new Cookies();
            cookies.set('user', {'Username': 'kwang', 'token': true});
            store.dispatch(setLoggedIn({token: true, 
                Username: username}))
            console.log("logged in");
            return true;
        }
        return false;
    }
}

export function logout() {
    const cookies = new Cookies();
    cookies.set('user', {'Username': null, 'token': false});
    window.location.reload(false);
}

export function reset(username) {
    console.log('Reset password for: ' + username);
    return true;
}

export function new_account(username, password) {
    console.log('New account with details: ' + username, password);
    if (!dummy) {
    fetch("/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        } ,
        body: JSON.stringify({username: username, 
            password: password,
            type: 'new_account'})
    }).then((res)=> console.log(res.json())); 
    }
    return true;
}

export function getAccount(username) {
    if (username.toLowerCase() === 'kwang') {
        return {
            found: true,
            details: {
                Name: 'Kwang Ming Cha',
                Title: 'King of the whisk',
                Description: "If there's whisky and there's a couch to pass out on, I'll be there.",
                Username: 'Kwang',
                Email: 'kwang@mingmail.cha',
                Beverage: 'The grouse'
            },
            rooms: 
                [{
                    name: 'onlyDrinks devs',
                    desc: 'The developers having a few',
                    pic: RoomPic
                },
                {
                    name: 'Dublin Delegation',
                    desc: 'This way for alcohol poisoning',
                    pic: RoomPic
                },
                {
                    name: 'Climbers',
                    desc: 'A whisky surely?',
                    pic: RoomPic
                }
            
                ],
            awards:  [{
                title: 'Beverages consumed',
                prog: 250,
                target: 300,
                level: 5
            },
            {
                title: 'Room trophies',
                prog: 5,
                target: 10,
                level: 3
            },
            {
                title: 'Games won',
                prog: 15,
                target: 20,
                level: 4
            },
            {
                title: 'Challenges wom',
                prog: 8,
                target: 10,
                level: 3
            }]

        }
    }
    if (username.toLowerCase() === 'liam') {
        return {
            found: true,
            details: {
                Name: 'Liam Lang',
                Title: 'Climb, drink, repeat',
                Description: "Surely you would.",
                Username: 'Liam',
                Email: 'liam@lang.mail',
                Beverage: 'My next one'
            },
            rooms: 
                [{
                    name: 'onlyDrinks devs',
                    desc: 'The developers having a few',
                    pic: RoomPic
                },
                {
                    name: 'Dublin Delegation',
                    desc: 'This way for alcohol poisoning',
                    pic: RoomPic
                },
                {
                    name: 'Climbers',
                    desc: 'A whisky surely?',
                    pic: RoomPic
                },
                {
                    name: 'Galway drinkers',
                    desc: 'Swedes beware',
                    pic: RoomPic
                }
            
                ],
            awards:  [{
                title: 'Beverages consumed',
                prog: 450,
                target: 500,
                level: 6
            },
            {
                title: 'Room trophies',
                prog: 11,
                target: 20,
                level: 4
            },
            {
                title: 'Games won',
                prog: 25,
                target: 50,
                level: 5
            },
            {
                title: 'Challenges wom',
                prog: 12,
                target: 15,
                level: 4
            }]

        }
    }
    return {
        found: false,
        details: {
        Username: username,
        Name: false
        }
    }
}