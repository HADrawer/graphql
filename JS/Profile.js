async function UserProfile() {
    
    const graphQuery = `
    query {
        
    user {
        id
        firstName
        lastName
        login
        email
    
    }
    }
    `;

    try{
        const data = await fetchGraphql(graphQuery);
        const user = data.data.user[0];


        document.getElementById('username_title').textContent = `${user.login}`;
    } catch(error){
        console.error('Error fetching data:', error);
    }

}