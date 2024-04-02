let Game = {
    initialize: function()
    {
        // Nothing to initialize...

        console.log("Game successfully initialized.");
    },
    sendRequest: function(request)
    {
        console.log("AT: Game.sendRequest()");

        request = this.parseRequest(request);

        switch (request.path[0])
        {
            case "location": // Player navigates to (visits) a location.
                return this.handleLocationRequest(request);
            case "data": // UI requests data about the game or game state.
                return this.handleDataRequest(request);
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },
    /*
        Routing structure:
        > Only locations are included in the route path.
          > Everything else, actions, talking to NPCs (also an action), etc., are denoted as query params.
          > Ex. /location/1?action_id=2 means to take action 2 listed under location 1
        > Menu routes will also be in the path.
          > Ex. /menu/map will access the map.
    */
    handleDataRequest: function(request)
    {
        switch (request.path[1])
        {
            case "game-state":
                return this.getGameState();
            case "location":
                return this.getLocationByID(request.path[2]);
            case "action":
                return this.getActionByID(request.path[2]);
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },
    handleLocationRequest: function(request)
    {
        console.log("AT: handleLocationRequest()");

        if (request.params["action_id"])
        {
            let locationID = request.path[1];
            let actionID = request.params["action_id"];

            return Locations[locationID].actions[actionID].actionHandler();
        }

        return Locations[request.path[1]].visit();
    },
    handleActionRequest: function(request)
    {
        // TODO: Implement this route.
        throw new Error("NotImplementedException");
    },
    getGameState: function()
    {
        // TODO: Eventually, initialize the GameState from save data here.
        return GameState;
    },
    getLocationByID: function(locationID)
    {
        return Locations[locationID];
    },
    getActionByID: function(actionID)
    {
        return this.actions[actionID];
    },
    parseRequest: function(request)
    {
        console.log("AT: parseRequest()");

        requestElements = request.route.split("?");
        
        let params = {};
        if (requestElements.length > 1)
        {
            requestElements[1].split("&").map(param => {
                param = param.split("=");
                params[param[0]] = param[1];
            });
        }

        request = {
            path: requestElements[0].split("/"),
            params: params
        }
        
        return request;
    }
}