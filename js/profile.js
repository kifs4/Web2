// Retrieve the current user data from session storage
const data = sessionStorage.getItem('currentUser');

// Check if the user data is available
if (data) {
    // Parse the user data from JSON format
    const profileData = JSON.parse(data);

    // Populate the profile table with the user's information
    document.getElementById('profile-table').innerHTML = `
    <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>${profileData.name}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${profileData.email}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>${profileData.gender}</td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td>${profileData.dob}</td>
        </tr>
    </tbody>    
    `;
} else {
    // Log a message if no profile data is found
    console.log('No profile data found.');
}
