let BackendUtils = {
    /*
        Returns a random integer between min (inclusive) and max (inclusive).
    */
    getRandomInt: function(min, max)
    {
        console.log("AT: BackendUtils.getRandomInt()");

        return Math.round(Math.random() * (max - min) + min);
    },
    /*
        Generates a string representation of a given location object.
    */
    generateLocationDataObject: function(locationObject, includeActionsData)
    {
        console.log("AT: BackendUtils.generateLocationDataObject()");

        let actionsData = [];
        for(const action of Object.values(locationObject.actions))
        {
            if (includeActionsData)
            {
                actionsData.push({
                    id: action.id,
                    name: action.name
                });
            }
            else
            {
                actionsData.push(action.id);
            }
        };

        return JSON.stringify({
            location: {
                id: locationObject.id,
                name: locationObject.name,
                description: locationObject.description,
                connectedLocations: locationObject.connectedLocations,
                actions: actionsData
            }
        });
    }
}