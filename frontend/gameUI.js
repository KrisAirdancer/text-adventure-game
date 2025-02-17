const GAMEUI = {
	htmlElements: {
		menuBar: document.getElementById("menu-bar"),
		locationHeader: document.getElementById("location-header"),
		contentArea: document.getElementById("content-area"),
		controlsBar: document.getElementById("controls-bar"),
		notificationsBar: document.getElementById("notifications-bar"),
		dateTimeBar: document.getElementById("datetime-bar"),
	},
	displayEnums: {
		MAIN_GAME_SCREEN: "MAIN_GAME_SCREEN",
		INVENTORY_SCREEN: "INVENTORY_SCREEN",
		EQUIPMENT_SCREEN: "EQUIPMENT_SCREEN"
	},
	gameplayEnums: {
		MONEY: "COPPERCOINS"
	},
	currentDisplay: "",
	displayBackButton: false,
	currentStateData: null,

    initialize()
    {
		// this.currentDisplay = "MAIN_GAME_SCREEN";
		this.currentDisplay = this.displayEnums.MAIN_GAME_SCREEN;

        this.currentStateData = JSON.parse(GAME.routeRequest({
			// TODO: This should have a method of GET.
            route: "/game-state"
        }));

		this.updateUi();

        console.log("===========================\nUI Successfully Initialized\n===========================");
    },

    reportPlayerInput(request)
    {
        console.log("AT: GAMEUI.reportPlayerInput()");

		let routeTokens = UTILS.getRouteTokens(request.route);

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

		switch (this.currentDisplay)
		{
			// case "INVENTORY":
			case this.displayEnums.INVENTORY_SCREEN:
				this.displayInventoryScreen();
				break;
			// case "EQUIPMENT":
			case this.displayEnums.EQUIPMENT_SCREEN:
				this.displayEquipmentScreen();
				break;
			default: // "MAIN_GAME_SCREEN"
				this.displayMainGameScreen();
				break;
		}
		// if (this.currentDisplay === "INVENTORY")
		// {
		// 	this.displayInventory();
		// }
		// else // MAIN_GAME_SCREEN
		// {
		// 	this.displayMainGameScreen();
		// }
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

		// null is used to indicate that the UI element should NOT be updated/changed.
		if (html.menuBarHtml !== null) { this.htmlElements.menuBar.innerHTML = html.menuBarHtml; }
		if (html.locationHeaderHtml !== null) { this.htmlElements.locationHeader.innerHTML = html.locationHeaderHtml; }
		if (html.contentAreaHtml !== null) { this.htmlElements.contentArea.innerHTML = html.contentAreaHtml; }
		if (html.controlsBarHtml !== null) { this.htmlElements.controlsBar.innerHTML = html.controlsBarHtml; }
		if (html.notificationsBarHtml !== null) { this.htmlElements.notificationsBar.innerHTML = html.notificationsBarHtml; }
		else { this.htmlElements.notificationsBar.innerHTML = ""; }
		if (html.dateTimeBarHtml !== null) { this.htmlElements.dateTimeBar.innerHTML = html.dateTimeBarHtml; }
	},

	handleGameplayActionRequest(request)
	{
		this.currentDisplay = this.displayEnums.MAIN_GAME_SCREEN;
		this.currentStateData = JSON.parse(GAME.routeRequest(request));
		this.updateUi();
	},

	handleMenuRequest(request)
	{
		console.log("AT: GAMEUI.handleMenuRequest()");

		let routeTokens = UTILS.getRouteTokens(request.route);

		switch (routeTokens[1])
		{
			case "inventory":
				this.currentDisplay = this.displayEnums.INVENTORY_SCREEN;
				this.displayBackButton = true;
				this.updateUi();
				break;
			case "equipment":
				this.currentDisplay = this.displayEnums.EQUIPMENT_SCREEN;
				this.displayBackButton = true;
				this.updateUi();
				break;
			case "display-gameplay-screen":
				this.currentDisplay = this.displayEnums.MAIN_GAME_SCREEN;
				this.displayBackButton = false;
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
			case "equip":
				this.handleEquipRequest(request);
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

	handleEquipRequest(request)
	{
		console.log("AT: GAMEUI.handleEquipRequest()");
		console.log("request: ", request);

		// Equip item
			// Make request to backend to equip an item.
		// Hide "equip" button
		// Display "unequip" button

		GAME.routeRequest(request);
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
			controlsBarHtml: this.buildControlsBarHtml(),
			notificationsBarHtml: this.buildNotificationsBarHtml(),
			dateTimeBarHtml: this.buildDateTimeBarHtml(),
		});
	},

	displayInventoryScreen()
	{
		this.setUiHtml({
			menuBarHtml: this.buildMenuBarHtml(),
			locationHeaderHtml: "INVENTORY",
			contentAreaHtml: this.buildInventoryHtml(),
			controlsBarHtml: "",
			notificationsBarHtml: "",
			dateTimeBarHtml: this.buildDateTimeBarHtml()
		});
	},

	displayEquipmentScreen()
	{
		console.log("AT: GAMEUI.displayEquipmentScreen()");

		this.setUiHtml({
			menuBarHtml: this.buildMenuBarHtml(), // This call is needed to ensure that the menuBar is updated. Building the HTML is what updates it.
			locationHeaderHtml: "EQUIPMENT",
			contentAreaHtml: this.buildEquipmentHtml(),
			controlsBarHtml: "",
			notificationsBarHtml: "",
			dateTimeBarHtml: this.buildDateTimeBarHtml() // This call is needed to ensure that the dateTimeBar is updated. Building the HTML is what updates it.
		});
	},

	buildInventoryHtml()
	{
		let inventory = this.currentStateData.player.inventory.toSorted((a, b) => {
			if (a.id === this.gameplayEnums.MONEY) { return -1; }
			if (b.id === this.gameplayEnums.MONEY) { return 1; }
			else { return a.nameSingular.localeCompare(b.nameSingular); }
		});

		if (inventory.length === 0) { return "<div>You have no items</div>" };

		let inventoryHtml = "";
		inventory.forEach(item => {
			let itemName = UTILS.getPluralSingularItemName(item.nameSingular, item.namePlural, item.count);
			let dropRequest = {
				method: "POST",
				route: `/menu/drop/${item.id}`,
				queryParams: {}
			}
			let dropLinkHtml = this.buildReportPlayerInputLinkHtml(dropRequest, "drop");

			let equipRequest = {
				method: "POST",
				route: `/menu/equip/${item.id}`,
				queryParams: {}
			}
			let equipLinkHtml = this.buildReportPlayerInputLinkHtml(equipRequest, "equip");

			if (item.isEquipable)
			{
				inventoryHtml += `<div id="inventory-${item.id}">${itemName} (${item.count}) [${dropLinkHtml}] [${equipLinkHtml}]</div>`;
			}
			else
			{
				inventoryHtml += `<div id="inventory-${item.id}">${itemName} (${item.count}) [${dropLinkHtml}]</div>`;
			}

			if (item.id === this.gameplayEnums.MONEY)
			{
				inventoryHtml += "<div>-</div>"
			}
		});

		return inventoryHtml;
	},

	buildEquipmentHtml()
	{
		console.log("AT: GAMEUI.buildEquipmentHtml()");

		let equipmentHtml = "equipment here...	";

		return equipmentHtml;
	},
	
	buildBackButtonHtml()
	{
		console.log("AT: GAMEUI.buildBackButtonHtml()");

		let request = {
			method: "GET",
			route: `/menu/display-gameplay-screen`,
			queryParams: {}
		};
		return this.buildReportPlayerInputLinkHtml(request, "back");
	},

    buildContentAreaHtml(content)
    {
        return `<p>${content}</p>`;
    },

    buildControlsBarHtml()
    {
        return this.buildActionsListHtml();
    },

    buildActionsListHtml()
    {
		let actions = this.currentStateData.currentLocation.actions;
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
		let equipmentLinkRequest = {
			method: "GET",
			route:"/menu/equipment",
			queryParams: {}
		};
		if (this.displayBackButton)
		{
			navBarHtml += this.buildBackButtonHtml() + `<span style="margin-right: 10px;"></span>`;
		}
        navBarHtml += this.buildReportPlayerInputLinkHtml(inventoryLinkRequest, "Inventory");
		navBarHtml += `<span style="margin-right: 10px;"></span>`;
        navBarHtml += this.buildReportPlayerInputLinkHtml(equipmentLinkRequest, "Equipment");
        // navBarHtml += this.buildNavigationBarLinkHtml("/menu/map", "Map");

		return navBarHtml;
    },

	buildReportPlayerInputLinkHtml(request, linkText)
	{
		console.log("AT: GAMEUI.buildReportPlayerInputLinkHtml()");

		return `<a href='javascript:GAMEUI.reportPlayerInput(${JSON.stringify(request)})'>${linkText}</a>`;
	},

	buildNotificationsBarHtml()
	{
		let notificationsText = this.currentStateData.notifications;

		let notificationsHtml = "";
		notificationsText.forEach(notification => {
            notificationsHtml += `<p>${notification}</p>`;
        })

		return notificationsHtml;
	},

	buildDateTimeBarHtml()
	{
		console.log("AT: GAMEUI.buildDateTimeBarHtml()");

		let currentDateTime = this.currentStateData.currentDateTime;
		let season = UTILS.capitalizeFirstLetter(currentDateTime.season.toLowerCase());
		return `<div>${currentDateTime.time}, Day ${currentDateTime.day}, Month ${currentDateTime.month}, Year ${currentDateTime.year} - ${season}</div>`;
	}
}