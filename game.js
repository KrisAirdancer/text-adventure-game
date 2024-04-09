let Game = {
    initialize: function()
    {
        console.log("AT: Game.initialize()");

        // Nothing to initialize...

        console.log("Game successfully initialized.");
        console.log("Initial GameState: ", GameState)
    },
    reportEvent: function(event)
    {
        console.log("AT: Game.reportEvent()");

        console.log("event: ", event);

        GameState.events.push(event);
    },

    //  TODO: Implement functions that update the GameState here.

    updatePlayerHp: function(hpDelta)
    {
        console.log("AT: Game.updatePlayerHp()");

        let hitPoints = GameState.player.hitPoints;
        let maxHitPoints = GameState.player.maxHitPoints;

        let newHitPoints = hitPoints + hpDelta;
        
        if (newHitPoints > maxHitPoints) { newHitPoints = maxHitPoints; }
        if (newHitPoints < 0) { newHitPoints = 0; } // TODO: If HP drops to or below zero, the player is dead. Add logic to handle that.

        GameState.player.hitPoints = newHitPoints;

        Game.reportEvent(Events.generateHpChangeEvent(hpDelta));
    },
    /*
        Adds the given items to the player's inventory.
    */
    updatePlayerInventory: function(items)
    {
        console.log("AT: Utils.addItemToPlayerInventory()");
        
        if (!Array.isArray(items)) { throw new Error(`eventsList must be a list. Got (${typeof eventsList})`); }

        // No items to add. Return without mutating the gameState.
        if (items.length < 1) { return; }

        let itemDeltas = []

        // Add items to player inventory.
        for (let i = 0; i < items.length; i++)
        {
            let item = items[i];

            let itemID = item[0];
            let quantity = item[1];

            if (quantity === 0) { continue; }

            if (quantity < 0)
            { // Remove item from inventory.
                if (itemID in GameState.player.inventory)
                {
                    let initialQuantity = GameState.player.inventory[itemID];
                    let newQuantity = initialQuantity + quantity;

                    if (newQuantity <= 0)
                    {
                        delete GameState.player.inventory[itemID];
                        itemDeltas.push([itemID, -initialQuantity]);
                    }
                    else
                    {
                        GameState.player.inventory[itemID] = newQuantity;
                        itemDeltas.push([itemID, quantity]);
                    }
                }
                // If the item is not already in the player's inventory, don't remove it.
            }
            else
            { // Add item to inventory.
                if (itemID in GameState.player.inventory)
                {
                    GameState.player.inventory[itemID] += quantity
                }
                else
                {
                    GameState.player.inventory[itemID] = quantity;
                }
                itemDeltas.push([itemID, quantity]);
            }
        }

        Game.reportEvent(Events.generateInventoryUpdateEvent(itemDeltas));
    }
}