let GameUI = {
    navigationBar: document.getElementById("navigation-bar"),
    locationHeader: document.getElementById("location-header"),
    contentArea: document.getElementById("content-area"),
    controlsBar: document.getElementById("controls-bar"),

    /*
        This function only needs to initialize the UI. So the logic here is specific to setting up the UI only when the game first launches.
    */
    initialize: function()
    {
        this.initializeNavigationBar();

        // Get the current game state.
        let stateData = Game.sendRequest({
            route: "data/game-state"
        });

        // Update the UI.
        let locationData = Game.sendRequest({
            route: `location/${stateData.currentLocation}`
        });
        this.updateUIWithLocationData(locationData);

        console.log("UI successfully initialized.");
    },
    reportAction: function(route)
    {
        console.log("AT: GameUI.reportAction()");

        let response = Game.sendRequest({
            route: route
        });

        let routeTokens = route.split("/");

        switch (routeTokens[0])
        {
            case "location":
                // TODO: Need to differentiate between taking an action and visiting a location.
                this.updateUIWithLocationData(response);
                break;
            case "menu":
                throw new Error("NotImplementedException");
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
            this.buildControlsBarHTML(locationData),
            locationData.locationName.toUpperCase()
        );
    },
    buildContentHTML: function(content)
    {
        return `<p>${content}</p>`;
    },
    buildControlsBarHTML: function(locationData)
    {
        return this.buildActionsHTML(locationData.locationID, locationData.actions) + this.buildLocationsNavLinksHTML(locationData.connectedLocations);
    },
    buildActionsHTML: function(locationID, actions)
    {
        let actionLinksHTML = "";
        Object.values(actions).forEach(action => {
            actionLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `location/${locationID}?action_id=${action.id}`, action.name) + "</p>";
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
            locationLinksHTML += "<p>" + this.buildLinkHTML("GameUI.reportAction", `location/${locationData.id}`, `Go to ${locationData.name}`) + "</p>";
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

        navBarHTML += FrontendUtils.generateNavigationBarLinkHTML("menu/inventory", "Inventory");
        navBarHTML += FrontendUtils.generateNavigationBarLinkHTML("menu/equipment", "Equipment");
        navBarHTML += FrontendUtils.generateNavigationBarLinkHTML("menu/map", "Map");

        this.navigationBar.innerHTML = navBarHTML;
    },
}