let Game = {
    locations: null,
    actions: null,
    initialize: function()
    {
        // Initialize locations Map()
        this.locations = new Map()
        Locations.forEach(location => {
            this.locations[location.id] = location
        });

        // Initialize actions Map()
        this.actions = new Map();
        Actions.forEach(action => {
            this.actions[action.id] = action
        });

        console.log("Game successfully initialized.");
    },
    sendRequest: function(request)
    {
        console.log("AT: Game.sendRequest()");
        console.log("request:", request);

        let route = request.route.split("/");
        console.log("route:", route);
        switch (route[0])
        {
            case "navigation": // Player navigates to (visits) a location.
                return this.handleNavigationRequest(request);
            case "action": // Player takes (executes) an action.
                return this.handleActionRequest(request);
            case "data": // UI requests data about the game or game state.
                return this.handleDataRequest(request);
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },
    handleDataRequest: function(request)
    {
        let route = request.route.split("/");
        switch (route[1])
        {
            case "game-state":
                return this.getGameState();
            case "location":
                return this.getLocationByID(route[2]);
            case "action":
                return this.getActionByID(route[2]);
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },
    handleNavigationRequest: function(request)
    {
        let route = request.route.split("/");
        return this.locations[route[1]].visit();
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
        return this.locations[locationID];
    },
    getActionByID: function(actionID)
    {
        return this.actions[actionID];
    }
}