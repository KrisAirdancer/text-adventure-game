let BackendUtils = {
    generateActionResultObject: function()
    {

    },
    generateLocationDataObject: function(locationObject)
    {
        return {
            locationID: locationObject.id,
            locationName: locationObject.name,
            description: locationObject.description,
            connectedLocations: locationObject.connectedLocations,
            actions: locationObject.actions
        }
    },
    generateGameStateDataObject: function()
    {
        return {
            currentLocation: GameState.currentLocation,
            player: {
                hitPoints: GameState.player.hitPoints,
                maxHitPoints: GameState.player.maxHitPoints,
                inventory: GameState.player.inventory
            }
        }        
    },
    /*
        Returns a random integer between min (inclusive) and max (inclusive).
    */
    getRandomInt: function(min, max)
    {
        return Math.round(Math.random() * (max - min) + min);
    }
}