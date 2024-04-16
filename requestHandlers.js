let RequestHandlers = {
    handleEquipmentChangeRequest: function(command)
    {
        console.log("AT: RequestHandlers.handleEquipmentChangeRequest()");
        console.log(command);

        throw new Error("Not implemented exception");
    },
    /*
        Visits the requested location.
    */
    handleVisitLocationRequest: function(command)
    {
        console.log("AT: RequestRouters.handleVisitLocation()");
        console.log("command: ", command);

        let requestedLocation = Locations[command.pathParams[1]];

        Game.setPlayerLocation(requestedLocation.id);
        requestedLocation.visit();

        // Nothing to return. We only need to update the GameState.
    },
    /*
        Executes the specified action.
    */
    handleActionRequest: function(command)
    {
        console.log("AT: RequestRouters.handleLocationActionRequest()");

        let location = Locations[command.pathParams[1]];
        let action = location.actions[command.queryParams.action_id];
        
        // Execute action
        action.actionHandler();

        // Nothing to return. We only need to update the GameState.
    }
}