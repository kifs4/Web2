// Add an event listener to the registration form for the submit event
document.getElementById('registration-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Collect user data from the form fields
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        password: document.getElementById('password').value
    };

    // Retrieve the list of users from local storage, or initialize an empty array if no users are found
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if a user with the same email already exists
    let userExists = users.find(user => user.email === userData.email);
    if (userExists) {
        // Alert the user if the email is already registered
        alert('User already exists');
        return;
    }

    // Add the new user data to the users array
    users.push(userData);

    // Save the updated users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Reset the registration form
    document.getElementById('registration-form').reset();

    // Redirect the user to the login page
    window.location.href = 'login.html';
});
