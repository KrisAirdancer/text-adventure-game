const Locations = {
    1: {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        connectedLocations: [2],
        visit: function()
        {
            // No special logic needed for this location.

            // TODO: Return a list of events that occurred by visiting this location.
        },
        actions: {
            1: {
                    id: 1,
                    name: "Rest in bed",
                    // This is an example of an action handler as should be called by the executeAction() function.
                    actionHandler: function()
                    {
                        let maxHitPoints = GameState.player.maxHitPoints;
                        let hitPoints = GameState.player.hitPoints;

                        // Restore 5-10% of player's HP.
                        let hpGained = Utils.getRandomInt( maxHitPoints * 0.05, maxHitPoints * 0.1);
                        if (hpGained < 1) { hpGained = 1; }
                        if (hitPoints + hpGained > maxHitPoints) { hpGained = maxHitPoints - hitPoints; }

                        Game.updatePlayerHp(hpGained);
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
            // No special logic needed for this location.
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
            // No special logic needed for this location.
        },
        actions: {
            1: {
                    id: 1,
                    name: "Search the forest",
                    actionHandler: function()
                    {
                        throw new Error("Not implemented exception");
                    }
            }
        }
    }
}