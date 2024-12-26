const GAMEUI = {
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
        let stateData = JSON.parse(GAME.routeRequest({
            route: "/game-state"
        }));
		console.log("stateData: ", stateData);

        this.updateUiWithLocationData(stateData.currentLocation);

        console.log("===========================\nUI Successfully Initialized\n===========================");
    },

    reportAction: function(route)
    {
        console.log("AT: GAMEUI.reportAction()");
        console.log("request:", route);

        let response = JSON.parse(GAME.routeRequest({
            route: route
        }));
        console.log("response:", response);

        let routeTokens = route.substring(1).split("/");
		console.log("rotueTokens: ", routeTokens);

		// TODO: The below logic should be replaced wiht a single call to updateUi().
		// > updateUi() should have the logic to determine what type of UI update to make, what HTML needs to be generated, etc.
		// > This will require significat refactoring, but it will make the entire system more efficient and easier to use - one function call here, and the whole of the UI is updated.
		// > Actually, the updateUi() logic could just update _all_ UI components each time it's called. Then I don't have to handle all of the strange routing logic.
		this.updateUiWithLocationData(response.currentLocation);
    },

	// Updates the HTML on the UI with the given HTML strings.
	/* HTML: {
			navigationBarHtml: <>,
			locationHeaderHtml: <>,
			contentAreaHtml: <>,
			controlsBarHtml: <>
		}
	*/
    updateUi: function(html)
    {
		console.log("AT: GAMEUI.updateUi()");

		if (html.navigationBarHtml) { this.navigationBar.innerHTML = html.navigationBarHtml }
        if (html.locationHeaderHtml) { this.locationHeader.innerHTML = html.locationHeaderHtml }
		if (html.contentAreaHtml) { this.contentArea.innerHTML = html.contentAreaHtml }
        if (html.controlsBarHtml) { this.controlsBar.innerHTML = html.controlsBarHtml }
    },

    updateUiWithLocationData: function(locationData)
    {
		console.log("AT: GAMEUI.updateUIWithLocationData()");
		console.log(locationData)

        this.updateUi({
            contentAreaHtml: locationData.description,
            controlsBarHtml: this.buildControlsBarHtml(locationData.actions),
            locationHeaderHtml: locationData.name.toUpperCase()
		});
    },

    buildContentHtml: function(content)
    {
        return `<p>${content}</p>`;
    },

    buildControlsBarHtml: function(actions)
    {
		console.log("AT: GAMEUI.buildControlsBarHTML()");

        return this.buildActionsHtml(actions);
    },

    buildActionsHtml: function(actions)
    {
        let actionLinksHtml = "";
        actions.forEach(action => {
            actionLinksHtml += "<p>" + this.buildLinkHtml("GAMEUI.reportAction", `/action/${action.id}`, action.name) + "</p>";
        })

		return actionLinksHtml;
    },

    buildLinkHtml: function(nameOfFunctionToCall, route, text)
    {
        return `<a href="javascript:${nameOfFunctionToCall}('${route}')">${text}</a>`;
    },

    initializeNavigationBar: function()
    {
        let navBarHTML = ""

		// TODO: Update these links.
        navBarHTML += this.generateNavigationBarLinkHtml("/navigation/inventory", "Inventory");
        navBarHTML += this.generateNavigationBarLinkHtml("/navigation/equipment", "Equipment");
        navBarHTML += this.generateNavigationBarLinkHtml("/navigation/map", "Map");

		this.updateUi({
			navigationBarHtml: navBarHTML
		})
    },

	generateNavigationBarLinkHtml: function(route, linkText)
	{
		return `<a href="javascript:GAMEUI.reportAction('${route}')">${linkText}</a>`;
	}
}