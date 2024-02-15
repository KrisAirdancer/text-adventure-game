let Locations = [
    {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        connectedLocations: [2, 3],
        actions: [1, 2],
        visit: function()
        {
            // TODO: Implement this route.
            throw new Error("NotImplementedException")
        }
    },
    {
        id: 2,
        name: "Thistlewood",
        description: "A description of Thistlewood.",
        connectedLocations: [1, 3],
        // Contains a list of actions that can be executed from this location.
        actions: [2, 3],
        visit: function()
        {
            // When .visit() is called, the location data object should be returned to the UI so that the proper data can be displayed.
            // Note that the .visit() function must be called so that any special logic associated with visiting the location runs to update the game state.
            return this
        }
    },
    {
        id: 3,
        name: "Dummy Location 1",
        description: "A dummy location.",
        connectedLocations: [3],
        actions: [],
        visit: function()
        {
            // TODO: Implement this route.
            throw new Error("NotImplementedException")
        }
    }
]