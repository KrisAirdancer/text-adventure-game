let Locations = {
    1: {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        connectedLocations: [2],
        visit: function()
        {
            return BackendUtils.generateLocationDataObject(this);
        },
        actions: {
            1: {
                    id: 1,
                    name: "Rest in bed",
                    // This is an example of an action handler as should be called by the executeAction() function.
                    actionHandler: function()
                    {
                        let maxHitPoints = Player.maxHitPoints;
                        let hitPoints = Player.hitPoints;

                        // Restore 5-10% of player's HP.
                        let hpGained = BackendUtils.getRandomInt( maxHitPoints * 0.05, maxHitPoints * 0.1);
                        if (hpGained < 1) { hpGained = 1; }

                        hitPoints += hpGained;

                        if (hitPoints > maxHitPoints) { hitPoints = maxHitPoints; }
                        Player.hitPoints = hitPoints;

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
            return BackendUtils.generateLocationDataObject(this);
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
            return BackendUtils.generateLocationDataObject(this);
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
