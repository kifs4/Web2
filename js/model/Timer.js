// Define the Timer class
export default class Timer {
    constructor(displayElement) {
        // Initialize the display element for the timer
        this.displayElement = displayElement;

        // Initialize the start time, updated time, and difference
        this.startTime = 0;
        this.updatedTime = 0;
        this.difference = 0;

        // Initialize the interval ID and running state
        this.tInterval = 0;
        this.running = 0;
    }

    // Method to start the timer
    start() {
        // Check if the timer is not already running
        if (!this.running) {
            // Set the start time to the current time minus the difference
            this.startTime = new Date().getTime() - this.difference;

            // Update the timer every millisecond
            this.tInterval = setInterval(this.update.bind(this), 1);

            // Set the running state to true
            this.running = 1;
        }
    }

    // Method to pause the timer
    pause() {
        // Check if the timer is currently running
        if (this.running) {
            // Clear the interval to stop the updates
            clearInterval(this.tInterval);

            // Calculate the difference in time
            this.difference = new Date().getTime() - this.startTime;

            // Set the running state to false
            this.running = 0;
        } else {
            // If the timer is not running, start it again
            this.start();
        }
    }

    // Method to reset the timer
    reset() {
        // Clear the interval to stop the updates
        clearInterval(this.tInterval);

        // Reset the display element to "00:00:00"
        this.displayElement.textContent = "00:00:00";

        // Reset the start time, difference, and running state
        this.startTime = 0;
        this.difference = 0;
        this.running = 0;
    }

    // Method to update the timer display
    update() {
        // Get the current time
        const now = new Date().getTime();

        // Calculate the difference in time
        this.difference = now - this.startTime;

        // Calculate hours, minutes, and seconds from the difference
        let hours = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.difference % (1000 * 60)) / 1000);

        // Format hours, minutes, and seconds to have leading zeros if needed
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        // Update the display element with the formatted time
        this.displayElement.textContent = hours + ':' + minutes + ':' + seconds;
    }
}
