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

    /**********************
     * GAMESTATE MUTATORS *
     **********************/
    
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
        console.log("AT: Game.addItemToPlayerInventory()");
        
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
    },
    setPlayerLocation: function(locationId)
    {
        console.log("AT: Game.setPlayerLocation()");

        GameState.player.currentLocation = locationId;
    },
    changeEquipment: function(itemId, equipOrUnequip)
    {
        console.log("AT: Game.changeEquipment()");

        const item = Items[itemId];

        if (!item) { throw new Error(`Invalid item ID: (${itemId})`); }
        if (!(itemId in GameState.player.inventory)) { throw new Error(`Item not in player inventory: (${itemId})`); }

        switch (item.type)
        {
            case Enums.equipmentTypes.HEAD:
                equipOrUnequip ?
                GameState.player.equipment.HEAD = itemId :
                GameState.player.equipment.HEAD = null;
                break;
            case Enums.equipmentTypes.NECK:
                equipOrUnequip ?
                GameState.player.equipment.NECK = itemId :
                GameState.player.equipment.NECK = null;
                break;
            case Enums.equipmentTypes.BODY:
                equipOrUnequip ?
                GameState.player.equipment.BODY = itemId :
                GameState.player.equipment.BODY = null;
                break;
            case Enums.equipmentTypes.HANDS:
                equipOrUnequip ?
                GameState.player.equipment.HANDS = itemId :
                GameState.player.equipment.HANDS = null;
                break;
            case Enums.equipmentTypes.ON_HAND:
                equipOrUnequip ?
                GameState.player.equipment.ON_HAND = itemId :
                GameState.player.equipment.ON_HAND = null;
                break;
            case Enums.equipmentTypes.OFF_HAND:
                equipOrUnequip ?
                GameState.player.equipment.OFF_HAND = itemId :
                GameState.player.equipment.OFF_HAND = null;
                break;
            case Enums.equipmentTypes.RING:
                equipOrUnequip ?
                GameState.player.equipment.RING = itemId :
                GameState.player.equipment.RING = null;
                break;
            case Enums.equipmentTypes.LEGS:
                equipOrUnequip ?
                GameState.player.equipment.LEGS = itemId :
                GameState.player.equipment.LEGS = null;
                break;
            case Enums.equipmentTypes.FEET:
                equipOrUnequip ?
                GameState.player.equipment.FEET = itemId :
                GameState.player.equipment.FEET = null;
                break;
            default:
                throw new Error(`Item type not equipable: (${item.type})`);
        }
    }
}