// TODO: When game is initialized, load all locations into a dictionary.
// > { <location-name>: { obj: <reference-to-object>, actions: { <action-id>: <action-reference>, <action-id>: ... }} }

import { Locations } from "./locations/locations.js";

const Game = {
    LocationValues: {},
    initialize: function()
    {
        // console.log(this.LocationValues);

        Locations.forEach(location => {
            // console.log(location);
            this.LocationValues[location.id] = location;
        });
    }
}

export {
    Game
}