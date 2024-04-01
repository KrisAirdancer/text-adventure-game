let GameUI = {
    navigationBar: document.getElementById("navigation-bar"),
    locationHeader: document.getElementById("location-header"),
    contentArea: document.getElementById("content-area"),
    controlsBar: document.getElementById("controls-bar"),

    // This function only needs to initialize the UI. So the logic here is specific to setting up the UI only when the game first launches.
    initialize: function()
    {
        this.initializeNavigationBar();

        // Get the current game state.
        let stateData = Game.sendRequest({
            route: "data/game-state"
        });

        // Update the UI.
        // TODO: It might be incorrect to ever request location data directly. I think this might cause errors down the road when the game first launches and a location is visited without calling .visit(). Look into this.
        let locationData = Game.sendRequest({
            route: `navigation/${stateData.currentLocation}`
        });
        this.updateUIWithLocationData(locationData);

        console.log("UI successfully initialized.");
    },
    reportAction: function(route)
    {
        console.log("AT: GameUI.reportAction()");
        console.log("request:", route);

        let response = Game.sendRequest({
            route: route
        });
        console.log("response:", response);

        let routeTokens = route.split("/");
        console.log("routeTokens:", routeTokens);
        switch (routeTokens[0])
        {
            case "navigation":
                this.updateUIWithLocationData(response);
                break;
            default:
                throw new Error(`Invalid route: ${request.route}`);
        }
    },
    updateUI: function(contentHTML, controlsBarHTML, currentLocationName)
    {
        this.locationHeader.innerHTML = currentLocationName;
        this.contentArea.innerHTML = contentHTML;
        this.controlsBar.innerHTML = controlsBarHTML;
    },
    updateUIWithLocationData: function(locationData)
    {
        this.updateUI(
            locationData.description,
            this.buildControlsBarHTML(locationData.connectedLocations, locationData.actions),
            locationData.locationName.toUpperCase()
        );
    },
    buildContentHTML: function(content)
    {
        return `<p>${content}</p>`;
    },
    buildControlsBarHTML: function(locations, actions)
    {
        return this.buildActionsHTML(actions) + this.buildLocationsNavLinksHTML(locations);
    },
    buildActionsHTML: function(actions)
    {
        let actionLinksHTML = "";
        actions.forEach(actionID => {
            let actionData = Game.sendRequest({
                route: `data/action/${actionID}`
            });
            actionLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `action/${actionData.id}`, actionData.name) + "</p>";
        })
        return actionLinksHTML;
    },
    buildLocationsNavLinksHTML: function(locations)
    {
        let locationLinksHTML = "";
        locations.forEach(locationID => {
            let locationData = Game.sendRequest({
                route: `data/location/${locationID}`
            });
            locationLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `navigation/${locationData.id}`, `Go to ${locationData.name}`) + "</p>";
        })
        return locationLinksHTML;
    },
    buildLinkHTML: function(nameOfFunctionToCall, route, text)
    {
        return `<a href="javascript:${nameOfFunctionToCall}('${route}')">${text}</a>`;
    },
    initializeNavigationBar: function()
    {
        let navBarHTML = ""

        navBarHTML += UiUtils.generateNavigationBarLinkHTML("navigation/inventory", "Inventory");
        navBarHTML += UiUtils.generateNavigationBarLinkHTML("navigation/equipment", "Equipment");
        navBarHTML += UiUtils.generateNavigationBarLinkHTML("navigation/map", "Map");

        this.navigationBar.innerHTML = navBarHTML;
    },
}

let UiUtils = {
    generateNavigationBarLinkHTML: function(route, linkText)
    {
        return `<a href="javascript:GameUI.reportAction('${route}')">${linkText}</a>`;
    }
}