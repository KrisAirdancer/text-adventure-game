let GameUI = {
    navigationBar: document.getElementById("navigation-bar"),
    contentArea: document.getElementById("content-area"),
    controlsBar: document.getElementById("controls-bar"),

    // This function only needs to initialize the UI. So the logic here is specific to setting up the UI only when the game first launches.
    initialize: function()
    {
        // Get the current game state.
        let stateData = Game.sendRequest({
            route: "data/game-state"
        })

        // Update the UI.
        let locationData = Game.sendRequest({
            route: `data/location/${stateData.currentLocation}`
        })
        this.contentArea.innerHTML = this.buildContentHTML(locationData.description)
        this.controlsBar.innerHTML = this.buildControlsBarHTML(locationData.connectedLocations, locationData.actions)

        console.log("UI successfully initialized.")
    },
    reportAction: function(route)
    {
        console.log("AT: GameUI.reportAction()")
        console.log("request:", route)

        let response = Game.sendRequest({
            route: route
        })
        console.log("response:", response)

        throw new Error("NotImplementedException")

        // Need:
            // Content panel data
            // Actions bar data - a list of actions to take and locations to visit.
                // Split into two lists in the response object: "actions" and "locations"
    },
    buildContentHTML: function(content)
    {
        return `<p>${content}</p>`
    },
    buildControlsBarHTML: function(locations, actions)
    {
        return this.buildActionsHTML(actions) + this.buildLocationsNavLinksHTML(locations)
    },
    buildActionsHTML: function(actions)
    {
        let actionLinksHTML = ""
        actions.forEach(actionID => {
            let actionData = Game.sendRequest({
                route: `data/action/${actionID}`
            })
            actionLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `action/${actionData.id}`, actionData.name) + "</p>"
        })
        return actionLinksHTML
    },
    buildLocationsNavLinksHTML: function(locations)
    {
        let locationLinksHTML = ""
        locations.forEach(locationID => {
            let locationData = Game.sendRequest({
                route: `data/location/${locationID}`
            })
            locationLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `navigation/${locationData.id}`, `Go to ${locationData.name}`) + "</p>"
        })
        return locationLinksHTML
    },
    buildLinkHTML: function(nameOfFunctionToCall, route, text)
    {
        return `<a href="javascript:${nameOfFunctionToCall}('${route}')">${text}</a>`
    }
}