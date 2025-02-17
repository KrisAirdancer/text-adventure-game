let GAME = {
	/*
		request format:
			{
				method: <method>,
				route: <path>,
				queryParams: {
					quantity: <id>
				}
			}
			Ex. { method: "POST", route: "/action" }
	*/
	routeRequest(request)
	{
		console.log("AT: GAME.routeRequest()");
		console.log("request: ", request);

		let routeTokens = UTILS.getRouteTokens(request.route);

		switch(routeTokens[0])
		{
			// Everything that is returned to the frontend should be in string format to prevent manipulation of the data by the fronted from changing the underlying data on the backend.
			case "gameplay-action": // POST /gameplay-action
				this._handleGameplayAction(request);
				return JSON.stringify(this._getResponseState());
			case "inventory": // GET /inventory
				return JSON.stringify(this._getResponseInventory());
			case "game-state": // GET /game-state
				return JSON.stringify(this._getResponseState());
			case "confirmed-drop": // POST /confirmed-drop
				this._handleDropItem(request);
				return JSON.stringify(this._getResponseState());
		};
	},

    _handleGameplayAction(request)
    {
		console.log("AT: GAME._handleAction()");

		let actionId = UTILS.getRouteTokens(request.route)[1];

        const action = DATA._getAction(actionId);

		STATE._clearNotifications();

        STATE._updateTime(10)

        if (action.travelDestinationId)
        {
            this._handleTravelAction(action)
        }
        if (action.search)
        {
            this._handleSearchAction(action)
        }
    },

    _handleTravelAction(action)
    {
		STATE._setCurrentLocation(action.travelDestinationId);
    },

	_handleDropItem(request)
	{
		console.log("AT: GAME._handleDropItem()");

		let routeTokens = UTILS.getRouteTokens(request.route);
		let quantity = STATE._getInventory()[routeTokens[1]] * -1;

		STATE._removeItemsFromInventory(routeTokens[1], quantity);
	},

	// handleSearchAction() should ONlY determine what was found.
	// A different function should be called to update the inventory.
    _handleSearchAction(action)
    {
		// Stringify and parse to copy the object to ensure that the underlying state is not modified.
        const searchAction = JSON.parse(JSON.stringify(action.search));

        const numFound = 3

        let items = searchAction.items;
		UTILS.shuffleArray(items)

        const searchValue = UTILS.getRandomInt(1, 100)

        let itemsFound = false
		let inventoryUpdates = {};

        for (let i = 0; i < numFound; i++)
        {
            let currentItem = items[i]

            if (searchValue <= currentItem.probability)
            {
                itemsFound = true
				
				let quantity = UTILS.getRandomInt(currentItem.minQuantity, currentItem.maxQuantity)
				let itemData = DATA._getItem(currentItem.itemId);
				let itemName = UTILS.getPluralSingularItemName(itemData.nameSingular, itemData.namePlural, quantity);

                if (currentItem.itemId in inventoryUpdates)
                {
					inventoryUpdates[currentItem.itemId] += quantity;
                }
                else
                {
                    inventoryUpdates[currentItem.itemId] = quantity;
                }
				
				STATE._addNotification(this._populateNotificationTextTemplate(searchAction.notificationTextTemplate, [quantity, itemName]));
            }            
        }

		STATE._updateInventory(inventoryUpdates);
        
        if (!itemsFound)
        {
			STATE._addNotification(searchAction.noItemsFoundText);
        }
    },

	// Returns an object that represents the game state formatted for use on the frontend.
	// This is the only data format that should be returned to the frontend.
    _getResponseState()
    {
        let state = STATE._getStateData();

        // Shift datetime to 1-indexed format.
        state.currentDateTime.day += 1
        state.currentDateTime.month += 1
        state.currentDateTime.monthOfSeason += 1
        state.currentDateTime.year += 1

        // Add the current location's data.
        state.currentLocation = STATE._getCurrentLocation();

        // Populate the actions data for the current location.
        let actionObjects = []
        state.currentLocation.actions.forEach(actionId => {
            actionObjects.push(DATA._getAction(actionId))
        })
        state.currentLocation.actions = actionObjects

        // Populate the inventory items' data.
        let itemObjects = []
        for (const [itemId, quantity] of Object.entries(state.player.inventory))
        {
            // itemObjects.push({ ...this.ITEMS[key], count: value })
            itemObjects.push({ ...DATA._getItem(itemId), count: quantity })
        }
        state.player.inventory = itemObjects

        // Remove duplicate/unnecessary fields.
        delete state.currentLocationId

        return state;
    },

    _getResponseInventory()
    {
        // Populate the inventory items' data.
        let itemObjects = []
        for (const [itemId, quantity] of Object.entries(STATE._getInventory()))
        {
            itemObjects.push({ ...DATA._getItem(itemId), count: quantity })
        }

        return { inventory: itemObjects };
    },

	_populateNotificationTextTemplate(textTemplate, values)
	{
		let notificationText = textTemplate
		values.forEach(value => {
			notificationText = notificationText.replace(/<[^>]+>/, value);
		})
		
		return notificationText
	},
}
