// Define the SessionListModel class
export default class SessionListModel {
    constructor() {
        // Initialize an empty array to hold session items
        this.items = [];

        // Initialize the onChangeCallback to null
        this.onChangeCallback = null;
    }
    
    // Method to add a new item to the session list
    add(item) {
        // Set the onChangeCallback for the item
        item.onChangeCallback = this.onChangeCallback;

        // Add the item to the items array
        this.items.push(item);
    }

    // Method to delete an item from the session list by its id
    delete(itemId) {
        // Find the index of the item to be deleted
        const itemIndex = this.items.findIndex((item) => item.id === itemId); 

        // Remove the item from the items array
        this.items.splice(itemIndex, 1);
    }

    // Method to load previous sessions from local storage
    loadPreviousSessions() {
        // Retrieve the sessions from local storage and parse them into an array
        this.items = JSON.parse(localStorage.getItem('sessions')) || [];
    }

    // Method to set the onChangeCallback function
    setOnChangeCallback(onChangeCallback) {
        // Assign the provided callback function to the onChangeCallback property
        this.onChangeCallback = onChangeCallback;
    }
}
