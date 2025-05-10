

async function login() {
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
            throw new Error('Invalid credentials');
        }
        const jwt = await response.json();
        console.log(jwt);
        

    }catch(error) {

    }
}