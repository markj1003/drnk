export async function log_in(username, password) {
    console.log('Loggedu in with: ' + username, password);
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

export function reset(username) {
    console.log('Reset password for: ' + username);
}

export function new_account(username, password) {
    console.log('New account with details: ' + username, password);
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