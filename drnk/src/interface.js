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
        if (username==='kwang') return true;
        return false;
    }
}

export function reset(username) {
    console.log('Reset password for: ' + username);
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