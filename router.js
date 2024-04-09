let Router = {
    routeCommand: function(command)
    {
        console.log("AT: routeCommand()");

        console.log("Command: ", command);
        
        command = Utils.parseCommand(command);
        console.log("Parsed Command: ", command);

        switch(true)
        {
            case (/^location\//).test(command.commandString):
                this.routeLocationRequest(command);
                break;
            case (/^menu\//).test(command.commandString):
                this.routeMenuRequest(command);
                break;
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    },
    routeMenuRequest: function(command)
    {
        console.log("AT: Router, handleMenuRequest()");
        console.log("command: ", command);
        
        switch(true)
        {
            case (/^menu\/equipment\/id_\d+\?equipped=(true|false)$/).test(command.commandString):
                RequestHandlers.handleEquipmentChangeRequest(command);
                break;
            default:
                throw new Error(`Invalid command: ${command.commandString}`);
        }
    },
    routeLocationRequest: function(command)
    {
        console.log("AT: Router.handleLocationRequest()");
        console.log("command: ", command);

        switch(true)
        {
            case (/^location\/id_\d+\?action_id=id_\d+$/).test(command.commandString): // Execute an action.
                return RequestHandlers.handleActionRequest(command);
            case (/^location\/id_\d+$/).test(command.commandString): // Visit location.
                return RequestHandlers.handleVisitLocationRequest(command);
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    }
}