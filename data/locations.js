const Locations = {
    "id_1": {
        id: "id_1",
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        connectedLocations: ["id_2"],
        visit: function()
        {
            // No special logic needed for this location.

            // TODO: Return a list of events that occurred by visiting this location.
        },
        actions: {
            "id_1": {
                    id: "id_1",
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
    "id_2": {
        id: "id_2",
        name: "Thistlewood",
        description: "A description of Thistlewood.",
        connectedLocations: ["id_1", "id_3"],
        // Contains a list of actions that can be executed from this location.
        visit: function()
        {
            // No special logic needed for this location.
        },
        actions: {}
    },
    "id_3": {
        id: "id_3",
        name: "Thistlewood Forest",
        description: "The forest of Thistlewood.",
        connectedLocations: ["id_2"],
        visit: function()
        {
            // No special logic needed for this location.
        },
        actions: {
            "id_1": {
                    id: "id_1",
                    name: "Search the forest",
                    actionHandler: function()
                    {
                        // TODO: Modify this function to return differing quantities of each item.
                        // TODO: Modify this function to return 0 or more items.
                        // TODO: Modify this function to yield different items at different rates.
                        let availableItems = ["id_3", "id_4", "id_5"];

                        let itemID = availableItems[Utils.getRandomInt(0, availableItems.length - 1)];
                        let quantity = 1;

                        Game.updatePlayerInventory([ [itemID, quantity] ]);
                    }
            }
        }
    }
}
