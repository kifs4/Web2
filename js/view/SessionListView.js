// Import the SessionView class
import SessionView from './SessionView.js';

// Define the SessionListView class
export default class SessionListView {
    constructor(sessionListModel) {
        // Initialize the session list model
        this.sessionListModel = sessionListModel;

        // Initialize controller methods for start, pause, and save actions
        this.controllerOnStart = null;
        this.controllerOnPause = null;
        this.controllerOnSave = null;

        // Add an event listener to the work session form for click events
        document.querySelector('#work-session-form').addEventListener('click', (e) => this.onClick(e));
    }

    // Method to set the controller's start method
    setControllerOnStart(controllerOnStart) {
        this.controllerOnStart = controllerOnStart;
    }

    // Method to set the controller's pause method
    setControllerOnPause(controllerOnPause) {
        this.controllerOnPause = controllerOnPause;
    }

    // Method to set the controller's save method
    setControllerOnSave(controllerOnSave) {
        this.controllerOnSave = controllerOnSave;
    }

    // Method to handle click events on the work session form
    onClick(e) {
        // Check if the clicked element is the start button
        if (e.target.id === 'start-session') {
            this.controllerOnStart();
            return;
        }

        // Check if the clicked element is the pause button
        if (e.target.id === 'pause-session') {
            this.controllerOnPause();
            return;
        }

        // Check if the clicked element is the save button
        if (e.target.id === 'save-session') {
            this.controllerOnSave();
            return;
        }
    }

    // Method to load previous sessions and return the HTML content
    loadPreviousSessions() {
        // Map over the session items and generate HTML for each session
        const sessionsHtml = this.sessionListModel.items.map((item) => {
            // Create a new SessionView for each item
            const sessionView = new SessionView(item);

            // Generate the HTML content for the session
            return sessionView.loadPreviousSessions();
        }).join("");

        // Return the concatenated HTML content
        return sessionsHtml;
    }

    // Method to generate the HTML content for the current session
    toHtml() {
        // Get the most recent session item
        const sessionView = this.sessionListModel.items[this.sessionListModel.items.length - 1];

        // Check if there is a session item
        if (sessionView) {
            // Create a new SessionView for the most recent session and generate its HTML content
            return new SessionView(sessionView).toHtml();
        }
    }
}
