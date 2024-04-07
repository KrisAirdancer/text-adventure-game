let Utils = {
    /*
        Returns a random integer between min (inclusive) and max (inclusive).
    */
    getRandomInt: function(min, max)
    {
        console.log("AT: Utils.getRandomInt()");

        return Math.round(Math.random() * (max - min) + min);
    },
    /*
        Converts the given command string into a command object.
    */
    parseCommand: function(command)
    {
        console.log("AT: Utils.parseCommand()");
        
        let commandElements = command.split("?");
        
        let params = {};
        if (commandElements.length > 1)
        {
            commandElements[1].split("&").map(param => {
                param = param.split("=");
                params[param[0]] = param[1];
            });
        }
        
        let commandObj = {
            commandString: command,
            pathParams: commandElements[0].split("/"),
            queryParams: params
        }
        
        return commandObj;
    },
    /*
        Adds the given items to the player's inventory.
    */
    addItemToPlayerInventory: function(items)
    {
        console.log("AT: Utils.addItemToPlayerInventory()");
        
        console.log("items: ", items);
        if (!Array.isArray(items)) { throw new Error(`eventsList must be a list. Got (${typeof eventsList})`); }

        if (items.length < 1) { throw new Error("Items list must be non-empty."); }

        // Add items to player inventory.

        // Return events.

        // TODO: 
        // return Events.generateInventoryUpdateEvent(...);
    }
}