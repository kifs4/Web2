// Import necessary modules and classes
import SessionListModel from './model/SessionListModel.js';
import SessionListView from './view/SessionListView.js';
import Controller from './controller/Controller.js';

// Initialize the session list model
let sessionListModel = new SessionListModel();

// Initialize the session list view with the session list model
let sessionListView = new SessionListView(sessionListModel);

// Initialize the controller with the session list model and session list view
let controller = new Controller(sessionListModel, sessionListView);
