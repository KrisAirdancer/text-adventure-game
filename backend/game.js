let Game = {
    start: function()
    {
        // Nothing to see here...
    },
    sendRequest: function(request)
    {
        console.log("AT: Game.sendRequest()")
        console.log("request:", request)

        let route = request.route.split("/")
        console.log(route)

        switch (route[0])
        {
            case "navigation":
                return this.navigationRouter(route[1])
            case "gameState":
                return this.getGameState(request)
            default:
                throw new Error(`Invalid route: ${request.route}`)
        }
    },
    getGameState: function()
    {
        // TODO: Eventually, initialize the GameState from save data here.

        return GameState

    },
    navigationRouter: function(locationID)
    {
        console.log("AT: navigationRouter()")
        
        return Locations[locationID].visit()
    },
    getLocationDataByID: function(locationID)
    {
        return Locations[locationID];
    }
}