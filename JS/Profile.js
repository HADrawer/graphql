async function UserProfile() {
    
    const graphQuery = `
    query {
        
    user {
        id
        firstName
        lastName
        login
        email
        campus
        auditRatio
        totalUp
        totalDown
        skills: transactions(where: {type: {_like: "%skill_%"}}, order_by: {id: asc}) {
               
      					amount
                type
        }
        
        projects: transactions(
        order_by: {createdAt: asc}
        where: {_and: [{path: {_regex: "^/([^/]+/){2,3}[^/]+$"}}, {type: {_eq: "xp"}}, {progress: {isDone: {_eq: true}}}, {path: {_nlike: "/bahrain/bh-module/piscine-js"}}, {path: {_nlike: "/bahrain/bh-module/piscine-rust"}}], _or: [{path: {_ilike: "/bahrain/bh-module/checkpoint/%"}}, {path: {_ilike: "%/bahrain/bh-module/%"}}]}
    ) {
        id
        userLogin
        type
        amount
        path
        createdAt
        object {
        name
        type
        }
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
                  <li><strong>User ID:</strong> ${user.id}</li>
                  <li><strong>First Name:</strong> ${user.firstName}</li>
                  <li><strong>Last Name:</strong> ${user.lastName}</li>
                  <li><strong>Username:</strong> ${user.login}</li>
                  <li><strong>Email:</strong> ${user.email}</li>
                  <li><strong>Campus:</strong> ${user.campus}</li>

                  <li><strong>Ratio Number:</strong> ${user.auditRatio.toFixed(2)}</li>
              </ul>
              </div>
`;

        auditRatioSVG(user.totalUp , user.totalDown);
        skillsSVG(user.skills);
        XPprojectsSVG(user.projects);
    } catch(error){
        console.error('Error fetching data:', error);
    }

}