let GameUI = {
    initialize: function()
    {
        this.navigationBar = document.getElementById("navigation-bar")
        this.contentArea = document.getElementById("content-area")
        this.actionsBar = document.getElementById("actions-bar")

        // Get the current game state.
        let stateData = Game.sendRequest({
            requestType: "GET",
            route: "initialize"
        })
        console.log("stateData:", stateData)

        // Update the UI.
        this.contentArea.innerHTML = this.buildContentHTML()
        this.actionsBar.innerHTML = this.buildActionsBarHTML({
            functionCall: "GameUI.reportAction",
            route: "navigation/thistlewood",
            text: "Go to Thistlewood"
        })
    },
    buildContentHTML: function()
    {
        return "A simple one room log cabin in the trees on the edge of Thistlewood."
    },
    buildActionsBarHTML: function(data)
    {
        return GameUIUtils.buildLinkHTML(data.functionCall, data.route, data.text)
    },
    reportAction: function(request)
    {
        console.log("AT: GameUI.reportAction()")
        console.log("request:", request)
    }
}

// TODO: Move to separate script file.
let GameUIUtils = {
    buildLinkHTML: function(functionCall, route, text)
    {
        return `<a href="javascript:${functionCall}('${route}')">${text}</a>`
    }
}