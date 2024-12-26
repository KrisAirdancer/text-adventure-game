const GAMEUI = {
	htmlElements: {
		navigationBar: document.getElementById("navigation-bar"),
		locationHeader: document.getElementById("location-header"),
		contentArea: document.getElementById("content-area"),
		controlsBar: document.getElementById("controls-bar"),
		notificationsBar: document.getElementById("notifications-bar"),
	},
	currentDisplay: "",
	currentStateData: null,

    initialize()
    {
		this.currentDisplay = "MAIN_GAME_SCREEN";

        this.currentStateData = JSON.parse(GAME.routeRequest({
            route: "/game-state"
        }));
		console.log("currentStateData: ", this.currentStateData);

		this.updateUi();

        console.log("===========================\nUI Successfully Initialized\n===========================");
    },

    reportAction(route)
    {
        console.log("AT: GAMEUI.reportAction()");
        console.log("route:", route);

		let routeTokens = route.substring(1).split("/");
		console.log("routeTokens: ", routeTokens);

		if (routeTokens[0] === "navigation")
		{
			this.handleNavigationRequest(route);
		}
		else
		{
			this.currentDisplay = "MAIN_GAME_SCREEN";

			this.currentStateData = JSON.parse(GAME.routeRequest({
				route: route
			}));
			console.log("currentStateData: ", this.currentStateData);
	
			this.updateUi();
		}
    },

    updateUi()
    {
		console.log("AT: GAMEUI.updateUi()");

		if (this.currentDisplay === "INVENTORY")
		{
			this.displayInventory();
		}
		else
		{
			this.displayMainGameScreen();
		}
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

		// null or undefined is used to indicate that the UI element should NOT be updated/changed.
		if (html.navigationBarHtml) { this.htmlElements.navigationBar.innerHTML = html.navigationBarHtml; }
		if (html.locationHeaderHtml) { this.htmlElements.locationHeader.innerHTML = html.locationHeaderHtml; }
		if (html.contentAreaHtml) { this.htmlElements.contentArea.innerHTML = html.contentAreaHtml; }
		if (html.controlsBarHtml) { this.htmlElements.controlsBar.innerHTML = html.controlsBarHtml; }
		if (html.notificationsBarHtml) { this.htmlElements.notificationsBar.innerHTML = html.notificationsBarHtml; }
		else { this.htmlElements.notificationsBar.innerHTML = ""; }
	},

	handleNavigationRequest(route)
	{
		console.log("AT: GAMEUI.handleNavigationRequest()");

		let routeTokens = route.substring(1).split("/");
		console.log("routeTokens: ", routeTokens);

		if (routeTokens[1] === "inventory")
		{
			this.currentDisplay = "INVENTORY";
			this.updateUi();
		}
	},

	displayMainGameScreen()
	{
		this.setUiHtml({
			navigationBarHtml: this.buildNavigationBarHtml(),
			locationHeaderHtml: this.currentStateData.currentLocation.name.toUpperCase(),
			contentAreaHtml: this.currentStateData.currentLocation.description,
			controlsBarHtml: this.buildControlsBarHtml(this.currentStateData.currentLocation.actions),
			notificationsBarHtml: this.buildNotificationsBarHtml(this.currentStateData.notifications)
		});
	},

	displayInventory()
	{
		this.setUiHtml({
			navigationBarHtml: this.buildNavigationBarHtml(),
			locationHeaderHtml: "INVENTORY",
			contentAreaHtml: this.buildInventoryHtml(),
			controlsBarHtml: this.buildBackButtonHtml(), // TODO: Populate this with a "back" button - will need logic to handle the back button press.
			notificationsBarHtml: ""
		});
	},

	buildInventoryHtml()
	{
		// return "INVENTORY CONTENTS";

		// NEXT: Finish implementing the logic to support dropping items.

		let inventory = this.currentStateData.player.inventory;
		console.log("inventory: ", inventory);

		let inventoryHtml = "";
		inventory.forEach(item => {
			console.log("item: ", item);

			let itemName = UTILS.getPluralSingularItemName(item.nameSingular, item.namePlural, item.count);
			let dropLinkHtml = this.buildActionLinkHtml("/drop", "drop");

			inventoryHtml += `<div>${itemName} (${item.count}) [${dropLinkHtml}]</div>`;
			// Sticks (3) [drop]
		});


		return inventoryHtml;
	},
	
	buildBackButtonHtml()
	{
		return "BACK BUTTON";
		throw new Error("NotImplementedException");
	},

    buildContentHtml(content)
    {
        return `<p>${content}</p>`;
    },

    buildControlsBarHtml(actions)
    {
        return this.buildActionsHtml(actions);
    },

    buildActionsHtml(actions)
    {
        let actionLinksHtml = "";
        actions.forEach(action => {
            actionLinksHtml += "<p>" + this.buildLinkHtml("GAMEUI.reportAction", `/action/${action.id}`, action.name) + "</p>";
        })

		return actionLinksHtml;
    },

    buildLinkHtml(nameOfFunctionToCall, route, text)
    {
        return `<a href="javascript:${nameOfFunctionToCall}('${route}')">${text}</a>`;
    },

    buildNavigationBarHtml()
    {
        let navBarHtml = ""

        navBarHtml += this.buildActionLinkHtml("/navigation/inventory", "Inventory");
        // navBarHtml += this.buildNavigationBarLinkHtml("/navigation/equipment", "Equipment");
        // navBarHtml += this.buildNavigationBarLinkHtml("/navigation/map", "Map");

		return navBarHtml;
    },

	buildActionLinkHtml(route, linkText)
	{
		return `<a href="javascript:GAMEUI.reportAction('${route}')">${linkText}</a>`;
	},

	buildNotificationsBarHtml(notificationsText)
	{
		let notificationsHtml = "";
		notificationsText.forEach(notification => {
            notificationsHtml += `<p>${notification}</p>`;
        })

		return notificationsHtml;
	},
}