// Add an event listener to the login form for the submit event
document.getElementById('login-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Collect user data from the form fields
    const userData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Retrieve the list of users from local storage, or initialize an empty array if no users are found
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user in the list of users that matches the entered email and password
    const user = users.find(user => user.email === userData.email && user.password === userData.password);

    // Check if the user exists
    if (user) {
        // Store the current user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        // Redirect the user to the profile page
        window.location.href = 'profile.html';
    } else {
        // Alert the user if the email or password is invalid
        alert('Invalid email or password');
    }
});
