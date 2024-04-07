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
                        let maxHitPoints = Player.maxHitPoints;
                        let hitPoints = Player.hitPoints;

                        // Restore 5-10% of player's HP.
                        let hpGained = BackendUtils.getRandomInt( maxHitPoints * 0.05, maxHitPoints * 0.1);
                        if (hpGained < 1) { hpGained = 1; }

                        hitPoints += hpGained;

                        if (hitPoints > maxHitPoints) { hitPoints = maxHitPoints; }
                        // TODO: Create a function to update the player's HP. Could have this return the HP_CHANGE_EVENT.
                        Player.hitPoints = hitPoints;

                        // Return a list of events that occurred as a result of taking this action.
                        return [
                            Events.generateHpChangeEvent(hpGained)
                        ]
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
                        // Randomly select an item from a list of findable items.
                        let probability = BackendUtils.getRandomInt(1, 100);

                        let foundItems = [];
                        if (probability <= 10)
                        { // Return a Morel Mushroom.
                            foundItems.push(3);
                        }
                        if (probability > 10 && probability <= 90)
                        { // Return a single item: Sticks or a Thistle Head.
                            let possibleItems = [4, 5];
                            let index = BackendUtils.getRandomInt(0, possibleItems.length);
                            foundItems.push({}[possibleItems[index]] = 1); // Create an object of type: { itemID: quantity }
                            
                            if (probability > 75 && probability < 90)
                            { // Additional item found.
                                for (let i = 0; i < 1; i++)
                                {
                                    index = BackendUtils.getRandomInt(0, possibleItems.length + 1);
                                    foundItems.push(possibleItems[index]);
                                }
                            }
                        }
                        // Else, no items found.

                        console.log("foundItems: ", foundItems);

                        // Add the new item(s) to the player's inventory and return an INVENTORY_UPDATE_EVENT.
                        return (foundItems.length > 0) ? [
                            BackendUtils.addItemToPlayerInventory(foundItems) // Returns an INVENTORY_UPDATE_EVENT
                        ] :
                        [] // If nothing was found, return no events.
                    }
            }
        }
    }
}
