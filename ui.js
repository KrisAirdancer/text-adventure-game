let UI = {
    initialize: function()
    {
        console.log("AT: UI.initialize()");

        // Nothing to initialize...

        console.log("Frontend successfully initialized.");
    },
    executeCommand: function(command)
    {
        console.log("AT: executeCommand()");

        console.log("Command: ", command);
        
        // Temporary override of dummy command.
        // command = "location/id_1" // Visit location 1
        command = "location/id_3?action_id=id_1" // Take action 1 at location 1
        console.log("Command Override: ", command);
        
        // Call routing function with the command.
        Router.routeCommand(command);

        // Update the UI based on the new game state.
        this.updateUi();
    },
    updateUi: function()
    {
        // TODO: Update the UI with data from the GameState object.
        // > Note: In this version of the game, the game is updated only via the GameState. All of the logic just makes changes to the GameState and then the UI reads from that object to update the data on the screen.

        console.log("AT: UI.updateUi()");

        console.log("GameState: ", GameState);

        /* CLEANUP */
        // TODO: Add a function to the Game object that resets the game state for the next cycle.
        // GameState.events = []; // After fully updating the UI, certain fields in the GameState need to be reset. This should be the last step in the game cycle.

        throw new Error("Not implemented exception.");
    }
}