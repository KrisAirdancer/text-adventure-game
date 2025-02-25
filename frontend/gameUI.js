const GAMEUI = {
	htmlElements:
	{
		menuBar: document.getElementById("menu-bar"),
		locationHeader: document.getElementById("location-header"),
		contentArea: document.getElementById("content-area"),
		controlsBar: document.getElementById("controls-bar"),
		notificationsBar: document.getElementById("notifications-bar"),
		dateTimeBar: document.getElementById("datetime-bar"),
	},
	displayEnums:
	{
		MAIN_GAME_SCREEN: "MAIN_GAME_SCREEN",
		INVENTORY_SCREEN: "INVENTORY_SCREEN",
		EQUIPMENT_SCREEN: "EQUIPMENT_SCREEN"
	},
	gameplayEnums:
	{
		MONEY: "COPPERCOINS"
	},
	currentDisplay: "",
	dropItemConfirmation: {
		showConfirmation: false,
		itemId: null
	},
	displayBackButton: false,
	currentStateData: null,

    initialize()
    {
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
		switch (this.currentDisplay)
		{
			case this.displayEnums.INVENTORY_SCREEN:
				this.displayInventoryScreen();
				break;
			case this.displayEnums.EQUIPMENT_SCREEN:
				this.displayEquipmentScreen();
				break;
			default:
				this.displayMainGameScreen();
				break;
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
			case "unequip":
				this.handleUnequipRequest(request);
				break;
		}
	},
	
	handleDropRequest(request)
	{
		let rt = UTILS.getRouteTokens(request.route);
		this.dropItemConfirmation.itemId = rt[2];
		this.dropItemConfirmation.showConfirmation = true;
		this.updateUi();
	},

	handleCancelDropRequest(request)
	{
		this.dropItemConfirmation.showConfirmation = false;
		this.dropItemConfirmation.itemId = null;
		this.updateUi();
	},

	handleConfirmedDrop(request)
	{
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
		// Equip the item (update game state)
		this.currentStateData = JSON.parse(GAME.routeRequest({
			...request,
			route: this.getTruncatedRoute(request.route, 1)
		}));

		this.updateUi();
	},

	handleUnequipRequest(request)
	{
		// Unequip the item (update the game state).
		this.currentStateData = JSON.parse(GAME.routeRequest({
			...request,
			route: this.getTruncatedRoute(request.route, 1)
		}));

		this.updateUi();
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

		// TODO: Update to still show the player's money even when their inventory is empty.
		if (inventory.length === 0) { return "<div>You have no items</div>" };

		let inventoryHtml = "";
		inventory.forEach(item => {
			let itemName = UTILS.getPluralSingularItemName(item.nameSingular, item.namePlural, item.count);
			let equipLinkHtml = this.buildEquipUnequipHtml(item);
			let dropLinkHtml = this.buildDropLinkHtml(item);

			if (item.isEquipable)
			{
				inventoryHtml += `<div id="inventory-${item.id}">${itemName} (${item.count}) [${dropLinkHtml}] [${equipLinkHtml}]</div>`;
			}
			else { inventoryHtml += `<div id="inventory-${item.id}">${itemName} (${item.count}) [${dropLinkHtml}]</div>`; }

			if (item.id === this.gameplayEnums.MONEY) { inventoryHtml += "<div>-</div>"; }
		});

		return inventoryHtml;
	},

	buildEquipUnequipHtml(item)
	{
		let equipRequest = {
			method: "POST",
			route: `/menu/equip`,
			queryParams: {
				itemId: item.id
			}
		}
		let unequipRequest = {
			method: "POST",
			route: `/menu/unequip`,
			queryParams: {
				itemId: item.id
			}
		}

		const equipmentItem = this.currentStateData.player.equipment[item.type];
		if (equipmentItem)
		{
			if (item.id == equipmentItem.id)
			{
				return this.buildReportPlayerInputLinkHtml(unequipRequest, "unequip");
			}
		}
		else
		{
			return this.buildReportPlayerInputLinkHtml(equipRequest, "equip");
		}
	},

	buildDropLinkHtml(item)
	{
		let dropRequest = {
			method: "POST",
			route: `/menu/drop/${item.id}`,
			queryParams: {}
		}
		return this.dropItemConfirmation.showConfirmation && item.id === this.dropItemConfirmation.itemId
				? this.buildDropItemConfirmationHtml(item.id)
				: this.buildReportPlayerInputLinkHtml(dropRequest, "drop");
	},

	buildDropItemConfirmationHtml(itemId)
	{
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
		return "drop? " + newLinksHtml;
	},

	buildEquipmentHtml()
	{
		let equipmentHtml = "";
		let equipment = this.currentStateData.player.equipment;
		const equipmentSlotNames = {
			HEAD: { name: "Head", obj: UTILS.copyData(equipment["HEAD"]) },
			NECK: { name: "Neck", obj: UTILS.copyData(equipment["NECK"]) },
			BODY: { name: "Body", obj: UTILS.copyData(equipment["BODY"]) },
			HANDS: { name: "Hands", obj: UTILS.copyData(equipment["HANDS"]) },
			ON_HAND: { name: "On Hand", obj: UTILS.copyData(equipment["ON_HAND"]) },
			OFF_HAND: { name: "Off Hand", obj: UTILS.copyData(equipment["OFF_HAND"]) },
			RING: { name: "Ring", obj: UTILS.copyData(equipment["RING"]) },
			LEGS: { name: "Legs", obj: UTILS.copyData(equipment["LEGS"]) },
			FEET: { name: "Feet", obj: UTILS.copyData(equipment["FEET"]) }
		};

		for (const [key, slotData] of Object.entries(equipmentSlotNames))
		{
			let unequipRequest = null;
			if (slotData.obj)
			{ // If slot has an item equipped.
				unequipRequest = {
					method: "POST",
					route: `/menu/unequip`,
					queryParams: {
						itemId: slotData.obj.id
					}
				}
			}

			const slotContents = equipment[key]
									? equipment[key].nameSingular + ` [${this.buildReportPlayerInputLinkHtml(unequipRequest, "unequip")}]`
									: "empty"
			equipmentHtml += `<div>${slotData.name.toUpperCase()}<div></div>${slotContents}</div>${key != "FEET" ? "<div>~</div>" : ""}`;
		}

		return equipmentHtml;
	},

	buildBackButtonHtml()
	{
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
		let currentDateTime = this.currentStateData.currentDateTime;
		let season = UTILS.capitalizeFirstLetter(currentDateTime.season.toLowerCase());
		return `<div>${currentDateTime.time}, Day ${currentDateTime.day}, Month ${currentDateTime.month}, Year ${currentDateTime.year} - ${season}</div>`;
	},

	getTruncatedRoute(route, deleteCount)
	{
		let routeTokens = UTILS.getRouteTokens(route);
		return "/" + routeTokens.toSpliced(0, deleteCount).join("/");
	},


}