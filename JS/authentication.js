

async function Signin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // const loginBtn = document.getElementById('login').value;

    const Userdata = btoa(`${username}:${password}`)

    try{
        
        const response = await fetch( 'https://learn.reboot01.com/api/auth/signin',{
            method: 'POST',
            headers: {
                Authorization: `Basic ${Userdata}`,
            },
        });

        if(!response.ok){
            throw new Error('Username or password is uncorrect');
        }
        const jwt = await response.json();
        localStorage.setItem('session', jwt)
        document.getElementById('Signin').style.display = 'none';
        document.getElementById('Profile').style.display = 'block';
        UserProfile()
        

    }catch(error) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = error.message;
    }
}

function SignOut(){
    localStorage.removeItem('session');
}

async function fetchGraphql(query) {
    const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql',{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query}),
    });
    return response.json();
}