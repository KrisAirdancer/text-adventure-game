let Locations = {
    1: {
        id: 1,
        name: "Player Cabin",
        description: "A simple one room log cabin in the trees on the edge of Thistlewood.",
        // Contains a list of locationIDs that specify which locations are accessible from this location.
        navigationOptions: [2, 3]
    },
    2: {
        id: 2,
        name: "Thistlewood",
        description: "A description of Thistlewood.",
        navigationOptions: [1, 3],
        visit: function()
        {
            // Generate a list of data objects representing the actions that can be taken from the current location.
            let actionsData = []
            for (let actionID in this.actions)
            {
                let action = this.actions[actionID]
                actionsData.push({
                    id: action.id,
                    name: action.name
                })
            }

            // Note: The format of this object (the keys) must be the same for all .visit() functions, but the data that is in each of those keys (the values) can be anything. Whatever is sent as the values will be displayed on the screen.
            return {
                content: this.description,
                actions: actionsData,
                navigationOptions: this.navigationOptions
            }
        },
        executeAction: function(actionID)
        {
            // This function should route the actionIDs to the appropriate action handler function in this location object.
            throw new Error("NotImplementedException")

            // This should be all that I need to do to handle actions.
            this.actions[actionID].actionHandler()
        },
        actions: {
            1: {
                id: 1,
                name: "Dummy Action",
                actionHandler: function()
                {
                    // This is an example of an action handler as should be called by the executeAction() function.
                    throw new Error("NotImplementedException")
                }
            }
        }
    },
    // TODO: Delete this location and associated references to it. It is for testing only.
    3: {
        id: 3,
        name: "Dummy Location 1"
    }
}