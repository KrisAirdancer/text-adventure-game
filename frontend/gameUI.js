const GAMEUI = {
	htmlElements: {
		menuBar: document.getElementById("menu-bar"),
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

    reportPlayerInput(request)
    {
        console.log("AT: GAMEUI.reportPlayerInput()");
        console.log("request:", request);

		let routeTokens = UTILS.getRouteTokens(request.route);
		console.log("routeTokens: ", routeTokens);

		switch (routeTokens[0])
		{
			case "menu":
				this.handleMenuRequest(request);
				break;
			case "gameplay-action":
				this.handleGameplayActionRequest(request);
				break;
		}
    },

    updateUi()
    {
		console.log("AT: GAMEUI.updateUi()");
		console.log("currentStateData: ", this.currentStateData);

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
			menuBarHtml: <>,
			locationHeaderHtml: <>,
			contentAreaHtml: <>,
			controlsBarHtml: <>
		}
	*/
	setUiHtml(html)
	{
		console.log("AT: GAMEUI.setUiHtml()");

		// null or undefined is used to indicate that the UI element should NOT be updated/changed.
		if (html.menuBarHtml) { this.htmlElements.menuBar.innerHTML = html.menuBarHtml; }
		if (html.locationHeaderHtml) { this.htmlElements.locationHeader.innerHTML = html.locationHeaderHtml; }
		if (html.contentAreaHtml) { this.htmlElements.contentArea.innerHTML = html.contentAreaHtml; }
		if (html.controlsBarHtml) { this.htmlElements.controlsBar.innerHTML = html.controlsBarHtml; }
		if (html.notificationsBarHtml) { this.htmlElements.notificationsBar.innerHTML = html.notificationsBarHtml; }
		else { this.htmlElements.notificationsBar.innerHTML = ""; }
	},

	handleGameplayActionRequest(request)
	{
		this.currentDisplay = "MAIN_GAME_SCREEN";
		this.currentStateData = JSON.parse(GAME.routeRequest(request));
		this.updateUi();
	},

	handleMenuRequest(request)
	{
		console.log("AT: GAMEUI.handleNavigationRequest()");

		let routeTokens = UTILS.getRouteTokens(request.route);

		switch (routeTokens[1])
		{
			case "inventory":
				this.currentDisplay = "INVENTORY";
				this.updateUi();
				break;
			case "display-gameplay-screen":
				this.currentDisplay = "MAIN_GAME_SCREEN";
				this.updateUi();
				break;
			case "drop":
				this.handleDropRequest(request);
				break;
			case "cancel-drop":
				this.handleCancelDropRequest(request);
				break;
			case "confirmed-drop":
				this.handleConfirmedDrop(request);
				break;
		}
	},
	
	handleDropRequest(request)
	{
		console.log("AT: GAMEUI.handleDropRequest()");

		// Collapse any other "drop pending" selectors.
		let inventoryElements = document.getElementById("content-area").children;
		for (let i = 0; i < inventoryElements.length; i++)
		{
			// Skip the spacer below the currency element.
			if (i == 1) { continue; }

			let child = inventoryElements[i];
			let itemId = child.id.substring(child.id.indexOf("-") + 1);
			this.hideDropItemConfirmation(itemId);
		}

		let routeTokens = UTILS.getRouteTokens(request.route);
		let itemId = routeTokens[2];

		this.displayDropItemConfirmation(itemId);
	},

	handleCancelDropRequest(request)
	{
		console.log("AT: GAMEUI.handleCancelDropRequest()");

		let routeTokens = UTILS.getRouteTokens(request.route);
		let itemId = routeTokens[2];

		this.hideDropItemConfirmation(itemId);
	},

	handleConfirmedDrop(request)
	{
		console.log("AT: GAMEUI.handleConfirmedDrop()");

		let routeTokens = UTILS.getRouteTokens(request.route);
		routeTokens.shift();
		let newRoute = "/" + routeTokens.join("/");
		
		this.currentStateData = JSON.parse(GAME.routeRequest({
			...request,
			route: newRoute
		}));
		this.updateUi();
	},

	displayDropItemConfirmation(itemId)
	{
		let itemHtml = document.getElementById(`inventory-${itemId}`);
		let innerHtmlPrefix = itemHtml.innerHTML.substring(0, itemHtml.innerHTML.indexOf("[") + 1);
		let yesRequest = {
			method: "POST",
			route: `/menu/confirmed-drop/${itemId}`,
			queryParams: {}
		};
		let noRequest = {
			method: "POST",
			route: `/menu/cancel-drop/${itemId}`,
			queryParams: {}
		};
		let newLinksHtml = `${this.buildReportPlayerInputLinkHtml(yesRequest, "yes")}/${this.buildReportPlayerInputLinkHtml(noRequest, "no")}`;
		let newInnerHtml = innerHtmlPrefix + "drop? " + newLinksHtml + "]";

		itemHtml.innerHTML = newInnerHtml;
	},

	hideDropItemConfirmation(itemId)
	{
		let itemHtml = document.getElementById(`inventory-${itemId}`);
		let innerHtmlPrefix = itemHtml.innerHTML.substring(0, itemHtml.innerHTML.indexOf("[") + 1);
		let dropRequest = {
			method: "POST",
			route: `/menu/drop/${itemId}`,
			queryParams: {}
		}
		let dropLinkHtml = this.buildReportPlayerInputLinkHtml(dropRequest, "drop");
		let newInnerHtml = innerHtmlPrefix + dropLinkHtml + "]";

		itemHtml.innerHTML = newInnerHtml;
	},

	displayMainGameScreen()
	{
		this.setUiHtml({
			menuBarHtml: this.buildMenuBarHtml(),
			locationHeaderHtml: this.currentStateData.currentLocation.name.toUpperCase(),
			contentAreaHtml: this.currentStateData.currentLocation.description,
			controlsBarHtml: this.buildControlsBarHtml(this.currentStateData.currentLocation.actions),
			notificationsBarHtml: this.buildNotificationsBarHtml(this.currentStateData.notifications)
		});
	},

	displayInventory()
	{
		this.setUiHtml({
			menuBarHtml: this.buildMenuBarHtml(),
			locationHeaderHtml: "INVENTORY",
			contentAreaHtml: this.buildInventoryHtml(),
			controlsBarHtml: this.buildBackButtonHtml(), // TODO: Populate this with a "back" button - will need logic to handle the back button press.
			notificationsBarHtml: ""
		});
	},

	buildInventoryHtml()
	{
		let inventory = this.currentStateData.player.inventory.toSorted((a, b) => {
			if (a.id === "COPPERCOINS") { return -1; }
			if (b.id === "COPPERCOINS") { return 1; }
			else { return a.nameSingular.localeCompare(b.nameSingular); }
		});

		if (inventory.length === 0) { return "<div>You have no items</div>" };

		let inventoryHtml = "";
		inventory.forEach(item => {
			let itemName = UTILS.getPluralSingularItemName(item.nameSingular, item.namePlural, item.count);
			let request = {
				method: "POST",
				route: `/menu/drop/${item.id}`,
				queryParams: {}
			}
			let dropLinkHtml = this.buildReportPlayerInputLinkHtml(request, "drop");

			inventoryHtml += `<div id="inventory-${item.id}">${itemName} (${item.count}) [${dropLinkHtml}]</div>`;

			if (item.id === "COPPERCOINS")
			{
				inventoryHtml += "<div>-</div>"
			}
		});

		return inventoryHtml;
	},
	
	buildBackButtonHtml()
	{
		console.log("AT: buildBackButtonHtml()");

		let request = {
			method: "GET",
			route: `/menu/display-gameplay-screen`,
			queryParams: {}
		};
		return this.buildReportPlayerInputLinkHtml(request, "back");
	},

    buildContentHtml(content)
    {
        return `<p>${content}</p>`;
    },

    buildControlsBarHtml(actions)
    {
        return this.buildActionsListHtml(actions);
    },

    buildActionsListHtml(actions)
    {
        let actionLinksHtml = "";
        actions.forEach(action => {
			let request = {
				method: "POST",
				route: `/gameplay-action/${action.id}`,
				queryParams: {}
			};
            actionLinksHtml += "<p>" + this.buildReportPlayerInputLinkHtml(request, action.name) + "</p>";
        })

		return actionLinksHtml;
    },

    buildMenuBarHtml()
    {
        let navBarHtml = ""

		let inventoryLinkRequest = {
			method: "GET",
			route:"/menu/inventory",
			queryParams: {}
		};
        navBarHtml += this.buildReportPlayerInputLinkHtml(inventoryLinkRequest, "Inventory");
        // navBarHtml += this.buildNavigationBarLinkHtml("/menu/equipment", "Equipment");
        // navBarHtml += this.buildNavigationBarLinkHtml("/menu/map", "Map");

		return navBarHtml;
    },

	buildReportPlayerInputLinkHtml(request, linkText)
	{
		console.log("AT: GAMEUI.buildReportPlayerInputLinkHtml()");

		return `<a href='javascript:GAMEUI.reportPlayerInput(${JSON.stringify(request)})'>${linkText}</a>`;
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