let BackendUtils = {
    /*
        Returns a random integer between min (inclusive) and max (inclusive).
    */
    getRandomInt: function(min, max)
    {
        console.log("AT: BackendUtils.getRandomInt()");

        return Math.round(Math.random() * (max - min) + min);
    },
    /*
        Generates a string representation of a given location object.
    */
    generateLocationDataObject: function(locationObject, includeActionsData)
    {
        console.log("AT: BackendUtils.generateLocationDataObject()");

        let actionsData = [];
        for(const action of Object.values(locationObject.actions))
        {
            if (includeActionsData)
            {
                actionsData.push({
                    id: action.id,
                    name: action.name
                });
            }
            else
            {
                actionsData.push(action.id);
            }
        };

        return {
            location: {
                id: locationObject.id,
                name: locationObject.name,
                description: locationObject.description,
                connectedLocations: locationObject.connectedLocations,
                actions: actionsData
            }
        };
    },
    /*
        Generates an object representing the game state.
    */
    generateGameStateDataObject: function(eventsList)
    {
        console.log("AT: BackendUtils.generateGameStateObject()");

        if (!Array.isArray(eventsList)) { throw new Error(`eventsList must be a list. Got (${typeof eventsList})`); }

        console.log("eventsList: ", eventsList);
        console.log("length: ", eventsList.length);
        let eventsObject = {}
        if (eventsList.length > 0)
        {
            eventsList.forEach(event => {
                eventsObject[event.name] = event;
            });
        }

        return {
            gameState: {
                player: Player
            },
            events: eventsObject
        }
    },
    /*
        Adds the given items to the player's inventory.
    */
    addItemToPlayerInventory: function(items)
    {
        console.log("AT: BackendUtils.addItemToPlayerInventory()");
        
        console.log("items: ", items);
        if (!Array.isArray(items)) { throw new Error(`eventsList must be a list. Got (${typeof eventsList})`); }

        if (items.length < 1) { throw new Error("Items list must be non-empty."); }

        // Add items to player inventory.

        // Return events.

        // TODO: 
        // return Events.generateInventoryUpdateEvent(...);
    }
}