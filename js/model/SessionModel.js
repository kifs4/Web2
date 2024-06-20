// Import the Timer class
import Timer from './Timer.js';

// Function to generate a unique ID
const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Define the SessionModel class
export default class SessionModel {
    constructor(title, description) {
        // Assign a unique ID to each session
        this.id = uid();

        // Assign title and description to the session
        this.title = title;
        this.description = description;

        // Initialize start and end times and length of the session
        this.startTime = null;
        this.endTime = null;
        this.length = 0;

        // Initialize the timer
        this.timer = null;

        // Initialize the onChangeCallback to null
        this.onChangeCallback = null;

        // Return the proxy to handle changes in the model
        return this.initOnModelChange();
    }
    
    // Method to start the session
    start() {
        // Set the start time to the current date and time
        this.startTime = new Date();

        // Initialize and start the timer
        this.timer = new Timer(document.querySelector('#timer'));
        this.timer.start();
    }

    // Method to pause the session
    pause() {
        // Check if the timer is running
        if (this.timer.running) {
            // Set the end time to the current date and time
            this.endTime = new Date();

            // Calculate the length of the session
            this.length += this.endTime - this.startTime;

            // Pause the timer
            this.timer.pause();
        } else {
            // If the timer is not running, restart the session
            this.startTime = new Date();
            this.timer.start();
        }
    }

    // Method to save the session
    save() {
        // Check if the timer is running
        if (this.timer.running) {
            // Set the end time to the current date and time
            this.endTime = new Date();

            // Calculate the length of the session
            this.length += this.endTime - this.startTime;

            // Pause the timer
            this.timer.pause();
        }

        // Retrieve existing sessions from local storage
        let sessions = JSON.parse(localStorage.getItem('sessions')) || [];

        // Add the current session to the sessions array
        sessions.push(this);

        // Save the updated sessions array to local storage
        localStorage.setItem('sessions', JSON.stringify(sessions));

        // Reset the timer
        this.timer.reset();

        // Reset the start time
        this.startTime = new Date();
    }
    
    // Method to set the onChangeCallback function
    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }

    // Initialize the proxy to handle changes in the model
    initOnModelChange() {
        // Define the proxy handler
        let handler = {
            set: (obj, prop, val) => {
                // Set the property value
                obj[prop] = val;

                // Call the onChangeCallback function if it is defined
                if (this.onChangeCallback) this.onChangeCallback(this);

                // Indicate that the property value was successfully set
                return true;
            }
        }

        // Return the proxy
        return new Proxy(this, handler);
    }
}
