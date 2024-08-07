import { Location } from '../types/gameAssets.js'

const Locations: Location[] = [
    {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        connectedLocations: [2],
        visit: function() {},
        actions: [
            {
                id: 1,
                name: "Rest in bed",
                handler: function()
                {
                    throw new Error("Function not implemented.")
                }
            }
        ]
    }
]
    
export {
    Locations
}