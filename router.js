let Router = {
    routeCommand: function(command)
    {
        console.log("AT: routeCommand()");

        console.log("Command: ", command);
        
        command = Utils.parseCommand(command);
        console.log("Parsed Command: ", command);

        switch(true)
        {
            case (/^location\/\d+/).test(command.commandString):
                this.handleLocationRequest(command);
                break;
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    },
    handleLocationRequest: function(command)
    {
        console.log("AT: Router.handleLocationRequest()");
        console.log("command: ", command);

        switch(true)
        {
            case (/^location\/\d+\?action_id=\d+$/).test(command.commandString): // Execute an action.
                return this.handleActionRequest(command);
            case (/^location\/\d+$/).test(command.commandString): // Visit location.
                return this.handleVisitLocation(command);
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    },
    /*
        Visits the requested location.
    */
    handleVisitLocation: function(command)
    {
        console.log("AT: Router.handleVisitLocation()");
        console.log("command: ", command);

        let requestedLocation = Locations[command.pathParams[1]];

        GameState.player.currentLocation = requestedLocation.id;
        requestedLocation.visit();

        // Nothing to return. We only need to update the GameState.
    },
    /*
        Executes the specified action.
    */
    handleActionRequest: function(command)
    {
        console.log("AT: Router.handleLocationActionRequest()");

        let location = Locations[command.pathParams[1]];
        let action = location.actions[command.queryParams.action_id];
        
        // Execute action
        action.actionHandler();

        // Nothing to return. We only need to update the GameState.
    }
}