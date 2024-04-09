let Utils = {
    // TODO: Update this function to conform to the standard of having the upper bound be exclusive.
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
    }
}