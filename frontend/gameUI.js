let GameUI = {
    navigationBar: document.getElementById("navigation-bar"),
    contentArea: document.getElementById("content-area"),
    actionsBar: document.getElementById("actions-bar"),

    // This function only needs to initialize the UI. So the logic here is specific to setting up the UI only when the game first launches.
    initialize: function()
    {
        // Get the current game state.
        let stateData = Game.sendRequest({
            route: "gameState/"
        })
        console.log("stateData:", stateData)

        // Update the UI.
        let locationData = Game.getLocationDataByID(stateData.currentLocation)
        this.contentArea.innerHTML = this.buildContentHTML(locationData.description)
        this.actionsBar.innerHTML = this.buildActionsBarHTML(locationData.navigationOptions)
    },
    buildContentHTML: function(content)
    {
        return `<p>${content}</p>`
    },
    buildActionsBarHTML: function(navigationOptions)
    {
        let actionsBarHTML = ""
        navigationOptions.forEach(locationID => {
            let locationData = Game.getLocationDataByID(locationID)
            actionsBarHTML += this.buildLinkHTML("GameUI.reportAction", `navigation/${locationData.id}/`, locationData.name) + "<br>"
        })
        return actionsBarHTML.substring(0, actionsBarHTML.lastIndexOf("<br>"))
    },
    reportAction: function(request)
    {
        console.log("AT: GameUI.reportAction()")
        console.log("request:", request)

        throw new Error("NotImplementedException")
    },
    buildLinkHTML: function(functionCall, route, text)
    {
        return `<a href="javascript:${functionCall}('${route}')">${text}</a>`
    }
}