let LocationRouter = {
    handleLocationRequest: function(request)
    {
        console.log("AT: LocationRouter.handleLocationRequest()");
        console.log("request: ", request);

        let routerString = `${request.method} ${request.route}`
        console.log("routerString: ", routerString);
        switch(true)
        {
            case (/^POST location\/\d+$/).test(routerString):
                return this.handleVisitLocation(request);
            case (/^GET location\/\d+$/).test(routerString):
                return this.handleVisitLocation(request);
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },

    /******************
     * ROUTE HANDLERS *
     ******************/

    /*
        Retrieves the requested location.
    */
    handleGetLocationData: function(request)
    {
        console.log("AT: LocationRouter.handleGetLocationData()");
        console.log("request: ", request);

        let requestedLocation = Locations[request.pathParams[1]];

        return BackendUtils.generateLocationDataObject(requestedLocation, true);
    },
    /*
        Visits the requested location and returns that location.
    */
    handleVisitLocation: function(request)
    {
        console.log("AT: LocationRouter.handleVisitLocation()");
        console.log("request: ", request);

        let requestedLocation = Locations[request.pathParams[1]];

        Player.currentLocation = requestedLocation.id;
        requestedLocation.visit();

        return BackendUtils.generateLocationDataObject(requestedLocation, true);
    }
}