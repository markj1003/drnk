import RoomPic from '../assets/defaultRoomPic.svg';
import Cookies from 'universal-cookie';
import store from '../storeSlices/store';
import { setLoggedIn } from '../storeSlices/loginSlice';
import baseURL  from '../httpCommon/httpCommon';
const dummy = false;

export async function log_in(username, password) {
    console.log('Attempted log-in with: ' + username, password);
   
    return await fetch("/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        })
    }).then(x => x.json());
    
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

export async function new_account(username, password) {
    console.log('New account with details: ' + username, password);
    return await fetch("/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password,
                type: 'new_account'
            }
        })
    });
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