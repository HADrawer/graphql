async function UserProfile() {
    
    const graphQuery = `
    query {
        
    user {
        id
        firstName
        lastName
        login
        email
        auditRatio
        totalUp
        totalDown
        skills: transactions(where: {type: {_like: "%skill_%"}}, order_by: {id: asc}) {
               
      					amount
                type
        }
    }
    }
    `;
    

    try{
        const data = await fetchGraphql(graphQuery);
        const user = data.data.user[0];
        document.getElementById('username_title').textContent = `${user.login}`;
        document.getElementById('ProfileInfo').innerHTML = `
              <h2>User Profile</h2>
              <div class="container">
              <ul>
                  <li><strong>First Name:</strong> ${user.firstName}</li>
                  <li><strong>Last Name:</strong> ${user.lastName}</li>
                  <li><strong>Username:</strong> ${user.login}</li>
                  <li><strong>Email:</strong> ${user.email}</li>
                  <li><strong>Ratio Number:</strong> ${user.auditRatio.toFixed(2)}</li>
              </ul>
              </div>
`;

        auditRatioSVG(user.totalUp , user.totalDown);
        skillsSVG(user.skills);
    } catch(error){
        console.error('Error fetching data:', error);
    }

}