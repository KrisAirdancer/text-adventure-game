let Backend = {
    initialize: function()
    {
        console.log("AT: Backend.initialize()");

        // Nothing to initialize...

        console.log("Backend successfully initialized.");
    },
    /*
        This is the router function. It parses request paths (URLs) and routes them to the correct handler.
    */
    sendRequest: function(request)
    {
        console.log("AT: Game.sendRequest()");
        console.log(request);
        
        // This check must be the first statement to run when a request comes into the backend.
        this.validateRequest(request);
        
        // Convert the request JSON string to an object.
        request = JSON.parse(request);
        
        // Parse request to extract path params and query params.
        request = this.parseRequest(request);
        console.log("post parsing: ", request);

        let response = undefined;
        switch(request.pathParams[0])
        {
            case "location":
                response = LocationRouter.handleLocationRequest(request);
                break;
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }

        return JSON.stringify(response);
    },
    validateRequest: function(request)
    {
        if ((typeof request) !== "string") { throw new Error("Request is not a string.") }
    },
    parseRequest: function(request)
    {
        console.log("AT: Game.parseRequest()");
        
        requestElements = request.route.split("?");
        
        let params = {};
        if (requestElements.length > 1)
        {
            requestElements[1].split("&").map(param => {
                param = param.split("=");
                params[param[0]] = param[1];
            });
        }
        
        request = {
            ...request,
            pathParams: requestElements[0].split("/"),
            queryParams: params
        }
        
        return request;
    }
}

// TODO: Implement a route to return the player's inventory. The full data objects for each item. Not just the ID and quantity.
// TODO: Add logic to return events from the .visit() functions for locations.
// TODO: Add logic to the Backend.initialize() function to iterate over all of the locations and items to ensure that the ID being used as the key in the dictionary matches the ID of the item the key is associated with.
// > Note: This might not make sense to add as part of the game logic directly. Instead, it should be part of the deployment pipeline so that it doesn't run every time someone launches the game.