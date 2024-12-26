const GAMEUI = {
    navigationBar: document.getElementById("navigation-bar"),
    locationHeader: document.getElementById("location-header"),
    contentArea: document.getElementById("content-area"),
    controlsBar: document.getElementById("controls-bar"),

    initialize: function()
    {
        let stateData = JSON.parse(GAME.routeRequest({
            route: "/game-state"
        }));
		console.log("stateData: ", stateData);

		this.updateUi(stateData);

        console.log("===========================\nUI Successfully Initialized\n===========================");
    },

    reportAction: function(route)
    {
        console.log("AT: GAMEUI.reportAction()");
        console.log("route:", route);

        let response = JSON.parse(GAME.routeRequest({
            route: route
        }));
        console.log("response:", response);

		this.updateUi(response);
    },

    updateUi: function(stateData)
    {
		console.log("AT: GAMEUI.updateUi()");
		
		this.setUiHtml({
			navigationBarHtml: this.buildNavigationBarHtml(),
			locationHeaderHtml: stateData.currentLocation.name.toUpperCase(),
			contentAreaHtml: stateData.currentLocation.description,
			controlsBarHtml: this.buildControlsBarHtml(stateData.currentLocation.actions)
		});
    },
	
	/*
		html: {
			navigationBarHtml: <>,
			locationHeaderHtml: <>,
			contentAreaHtml: <>,
			controlsBarHtml: <>
		}
	*/
	setUiHtml(html)
	{
		console.log("AT: GAMEUI.setUiHtml()");

		if (html.navigationBarHtml) { this.navigationBar.innerHTML = html.navigationBarHtml }
		if (html.locationHeaderHtml) { this.locationHeader.innerHTML = html.locationHeaderHtml }
		if (html.contentAreaHtml) { this.contentArea.innerHTML = html.contentAreaHtml }
		if (html.controlsBarHtml) { this.controlsBar.innerHTML = html.controlsBarHtml }
	},

    buildContentHtml: function(content)
    {
        return `<p>${content}</p>`;
    },

    buildControlsBarHtml: function(actions)
    {
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

    buildNavigationBarHtml: function()
    {
        let navBarHtml = ""

        navBarHtml += this.buildNavigationBarLinkHtml("/navigation/inventory", "Inventory");
        navBarHtml += this.buildNavigationBarLinkHtml("/navigation/equipment", "Equipment");
        navBarHtml += this.buildNavigationBarLinkHtml("/navigation/map", "Map");

		return navBarHtml;
    },

	buildNavigationBarLinkHtml: function(route, linkText)
	{
		return `<a href="javascript:GAMEUI.reportAction('${route}')">${linkText}</a>`;
	}
}