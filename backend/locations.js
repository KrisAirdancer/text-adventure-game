let Locations = {
    1: {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        connectedLocations: [2],
        visit: function()
        {
            return LocationsUtils.generateLocationDataObject(this);
        },
        actions: {
            1: {
                    id: 1,
                    name: "Rest in bed",
                    actionHandler: function()
                    {
                        // This is an example of an action handler as should be called by the executeAction() function.
                        throw new Error("NotImplementedException");
                    }
            }
        }
    },
    2: {
        id: 2,
        name: "Thistlewood",
        description: "A description of Thistlewood.",
        connectedLocations: [1, 3],
        // Contains a list of actions that can be executed from this location.
        visit: function()
        {
            // When .visit() is called, the location data object should be returned to the UI so that the proper data can be displayed.
            // Note that the .visit() function must be called so that any special logic associated with visiting the location runs to update the game state.
            return LocationsUtils.generateLocationDataObject(this);
        },
        actions: []
    },
    3: {
        id: 3,
        name: "Thistlewood Forest",
        description: "The forest of Thistlewood.",
        connectedLocations: [2],
        visit: function()
        {
            return LocationsUtils.generateLocationDataObject(this);
        },
        actions: {
            1: {
                    id: 1,
                    name: "Search the forest",
                    actionHandler: function()
                    {
                        // This is an example of an action handler as should be called by the executeAction() function.
                        throw new Error("NotImplementedException");
                    }
            }
        }
    }
}

let LocationsUtils = {
    generateLocationDataObject: function(locationObject)
    {
        return {
            locationID: locationObject.id,
            locationName: locationObject.name,
            description: locationObject.description,
            connectedLocations: locationObject.connectedLocations,
            actions: locationObject.actions
        }
    }
}