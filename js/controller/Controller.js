// Import necessary modules and classes
import SessionListView from "../view/SessionListView.js";
import SessionModel from "../model/SessionModel.js";
import SessionView from "../view/SessionView.js";

// Define the main Controller class
export default class Controller {
    constructor(sessionListModel, sessionListView) {
        // Initialize the session list model and view
        this.sessionListModel = sessionListModel;
        this.sessionListView = sessionListView;

        // Set the callback function to be executed when the model changes
        this.sessionListModel.setOnChangeCallback((e) => this.onChangeCallback(e));

        // Set controller methods for start, pause, and save actions in the view
        this.sessionListView.setControllerOnStart(this.start);
        this.sessionListView.setControllerOnPause(this.pause);
        this.sessionListView.setControllerOnSave(this.save);

        // Initialize the proxy to handle model changes
        this.initOnModelChange();

        // Load previous sessions from local storage if they exist
        if (localStorage.getItem('sessions')) {
            this.loadPreviousSessions();
        }
    }

    // Callback function to update the view when the model changes
    onChangeCallback() {
        // Update the HTML content of the work session form
        document.querySelector('#work-session-form').innerHTML = this.sessionListView.toHtml();
    }

    // Start a new session
    start() {
        // Get the session title and description from the input fields
        let title = document.querySelector('#session-title').value || 'Untitled';
        let description = document.querySelector('#session-description').value || 'No description';

        // Add a new session to the model
        this.sessionListModel.add(new SessionModel(title, description));

        // Start the latest session
        this.sessionListModel.items[this.sessionListModel.items.length - 1].start();
    }

    // Pause the current session
    pause() {
        // Pause the latest session
        this.sessionListModel.items[this.sessionListModel.items.length - 1].pause();
    }

    // Save the current session
    save() {
        // Log the session items before saving
        console.log(this.sessionListModel.items);

        // Save the latest session
        this.sessionListModel.items[this.sessionListModel.items.length - 1].save();

        // Log the session items after saving
        console.log(this.sessionListModel.items);

        // Reset the work session form in the HTML
        document.querySelector('#work-session-form').innerHTML = SessionView.inputHtmlForm();

        // Log the HTML content of the previous sessions list before updating
        console.log(document.querySelector('#previous-sessions-list').innerHTML);

        // Load previous sessions into the model
        this.sessionListModel.loadPreviousSessions();

        // Create a new SessionListView instance and update the previous sessions list
        let sessionListView = new SessionListView(this.sessionListModel);
        document.querySelector('#previous-sessions-list').innerHTML = sessionListView.loadPreviousSessions();

        // Log the HTML content of the previous sessions list after updating
        console.log(document.querySelector('#previous-sessions-list').innerHTML);
    }

    // Load previous sessions from the model and update the view
    loadPreviousSessions() {
        // Load previous sessions into the model
        this.sessionListModel.loadPreviousSessions();

        // Update the HTML content of the previous sessions list
        document.querySelector('#previous-sessions-list').innerHTML = this.sessionListView.loadPreviousSessions();
    }

    // Initialize the proxy to handle changes in the model
    initOnModelChange() {
        // Define the proxy handler to update the view when the model changes
        let handler = {
            set: (obj, prop, val) => {
                // Set the property value
                obj[prop] = val;

                // Update the HTML content of the work session form
                document.querySelector('#work-session-form').innerHTML = this.sessionListView.toHtml();

                // Indicate that the property value was successfully set
                return true;
            }
        }

        // Apply the proxy to the session list model items
        this.sessionListModel.items = new Proxy(this.sessionListModel.items, handler);
    }
}
