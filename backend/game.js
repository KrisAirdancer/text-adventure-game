let GAME = {
    LOCATIONS: {},
    ACTIONS: {},
    ITEMS: {},
    STATE: {
        currentLocationId: "PLAYERCABIN",
        currentDateTime: {
            minutes: 450, // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
            time: "7:30 AM",
            day: 0, // The day number of the current month. 0-29
            month: 0, // The month number of the current year. 0-11
            monthOfSeason: 0, // The current month of the current season. 0-2
            season: "SPRING",
            year: 0 // The year number.
        },
        player: {
            // TODO: Add currentHp, maxHp, inventory, etc.
            inventory: {
                "COPPERCOINS": 100,
                "BRONZEAXE": 1,
                "LEATHERBOOTS": 1
            }
        },
        notifications: []
    },

    _initialze()
    {
		LOCATIONS_DATA.forEach(location => {
			this.LOCATIONS[location['id']] = JSON.parse(JSON.stringify(location));
		})

		ACTIONS_DATA.forEach(action => {
			this.ACTIONS[action['id']] = JSON.parse(JSON.stringify(action))
		})

		ITEMS_DATA.forEach(item => {
			this.ITEMS[item['id']] = JSON.parse(JSON.stringify(item))
		})
    },

	/*
		request format:
			{
				METHOD: <method>,
				PATH: <path>,
				PARAMS: {
					actionId: <id>
				}
			}
			Ex. { METHOD: "POST", PATH: "/action" }
	*/
	routeRequest(request)
	{
		console.log("AT: game.js/routeRequest()");
		console.log("request: ", request);

		/*
			POST /action
			GET /inventory
			GET /game-state
		*/
		switch(request.PATH)
		{
			// Everything that is returned to the frontend should be in string format to prevent manipulation of the data by the fronted from changing the underlying data on the backend.
			case "/action":
				this._handleAction(request.PARAMS.actionId);
				return JSON.stringify(this._getResponseState());
			case "/inventory":
				return JSON.stringify(this._getInventory());
			case "/game-state":
				return JSON.stringify(this._getGameState());
		};
	},

    // TODO: handleAction() is currently being used as the primary entrypoint to the Game object.
    // > However, it might make more sense to have a function, such as "processGameCycle()", that can take in an action object (and other objects/options) that runs the full game cycle.
    _handleAction(actionId)
    {
		// Stringify and parse to copy the object to prevent modification of the underlying object in state.
        const action = JSON.parse(JSON.stringify(this.ACTIONS[actionId]));

        // Clear old notifications.
        this.STATE.notifications = []

        this._updateTime(10)

        if (action.travelDestinationId)
        {
            this._handleTravelAction(action)
        }
        if (action.search)
        {
            this._handleSearchAction(action)
        }
    },

    _updateTime(duration)
    {
        if (duration < 0) { throw Error(`Duration must be greater than zero. Got ${duration}`) }

        let date = this.STATE.currentDateTime
        let minutesPassed = date.minutes + duration

        // Update minutes
        // TODO: Check that this is rolling over at 1440. That is, thre should never be a 1440, only a 1439. 1440 becomes 0 of the next day.
        date.minutes = minutesPassed % 1440
        let daysPassed = ((minutesPassed - date.minutes) / 1440) + date.day

        // Update days
        date.day = daysPassed % 30
        let monthsPassed = ((daysPassed - date.day) / 30) + date.month

        // Update years
        date.month = monthsPassed % 12
        let yearsPassed = ((monthsPassed - date.month) / 12) + date.year
        date.year = yearsPassed

        // Update season
        if (date.month >= 0 && date.month <= 2) { date.season = "SPRING" }
        else if (date.month >= 3 && date.month <= 5) { date.season = "SUMMER" }
        else if (date.month >= 6 && date.month <= 8) { date.season = "FALL" }
        else if (date.month >= 9 && date.month <= 11) { date.season = "WINTER" }
        else { throw Error(`monthNumber ${date.month} not in the valid range of 0-11`) }

        // Update monthOfSeason
        if (date.month % 3 === 0) { date.monthOfSeason = 0 }
        else if (date.month % 3 === 1) { date.monthOfSeason = 1 }
        else if (date.month % 3 === 2) { date.monthOfSeason = 2 }
        else { throw Error("Unable to set monthOfSeason") }

        // Generate human-readable time.
        let period = ""
        let m = date.minutes % 60
        let h = (date.minutes - m) / 60
        if (h < 12) { period = "AM" }
        if (h >= 12) { period = "PM" }
        if (h === 0) { h = 12 }
        if (h > 12) { h = h % 12 }
        date.time = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString() + " " + period
    },

    _handleTravelAction(action)
    {
        this.STATE.currentLocationId = action.travelDestinationId
    },

    _handleSearchAction(action)
    {
		// Stringify and parse to copy the object to ensure that the underlying state is not modified.
        const searchAction = JSON.parse(JSON.stringify(action.search));

        const numFound = 3

        // The data in the JSON files is read-only (or should at least be treated as such). So we make a copy of the data to prevent modification of the reference.
        let items = searchAction.items;
		UTILS._shuffleArray(items)

        const searchValue = UTILS._getRandomInt(1, 100)

        let itemsFound = false
        let inventory = this.STATE.player.inventory
        for (let i = 0; i < numFound; i++)
        {
            let currentItem = items[i]

            if (searchValue <= currentItem.probability)
            {
                itemsFound = true
                if (currentItem.itemId in inventory)
                {
                    let quantity = UTILS._getRandomInt(currentItem.minQuantity, currentItem.maxQuantity)
                    inventory[currentItem.itemId] += quantity
                    this.STATE.notifications.push(UTILS._buildNotificationText(searchAction.notificationTextTemplate, [quantity, quantity > 1 ? this.ITEMS[currentItem.itemId].namePlural : this.ITEMS[currentItem.itemId].nameSingular]))
                }
                else
                {
                    let quantity = UTILS._getRandomInt(currentItem.minQuantity, currentItem.maxQuantity)
                    inventory[currentItem.itemId] = quantity
                    this.STATE.notifications.push(UTILS._buildNotificationText(searchAction.notificationTextTemplate, [quantity, quantity > 1 ? this.ITEMS[currentItem.itemId].namePlural : this.ITEMS[currentItem.itemId].nameSingular]))
                }
            }            
        }
        
        if (!itemsFound)
        {
            this.STATE.notifications.push(searchAction.noItemsFoundText)
        }
    },

	// Returns an object that represents the game state formatted for use on the frontend.
	// This is the only data format that should be returned to the frontend.
    _getResponseState()
    {
        let state = JSON.parse(JSON.stringify(this.STATE))

        // Shift datetime to 1-indexed format.
        state.currentDateTime.day += 1
        state.currentDateTime.month += 1
        state.currentDateTime.monthOfSeason += 1
        state.currentDateTime.year += 1

        // Add the current location's data.
        state.currentLocation = JSON.parse(JSON.stringify(this.LOCATIONS[this.STATE.currentLocationId]))

        // Populate the actions data for the current location.
        let actionObjects = []
        state.currentLocation.actions.forEach(actionId => {
            actionObjects.push(this.ACTIONS[actionId])
        })
        state.currentLocation.actions = actionObjects

        // Populate the inventory items' data.
        let itemObjects = []
        for (const [key, value] of Object.entries(state.player.inventory))
        {
            itemObjects.push({ ...this.ITEMS[key], count: value })
        }
        state.player.inventory = itemObjects

        // Remove duplicate/unnecessary fields.
        delete state.currentLocationId

        return state;
    },

	// Returns an object that represents the game state.
	// This data format should NOT be returned to the frontend.
    _getGameState()
    {
        return this._getResponseState();
    },

    _getInventory()
    {
        // Populate the inventory items' data.
        let itemObjects = []
        for (const [key, value] of Object.entries(this.STATE.player.inventory))
        {
            itemObjects.push({ ...this.ITEMS[key], count: value })
        }

        return { inventory: itemObjects };
    },

    // Adds or removes items to/from the player's inventory.
    _updateInventory(itemId, quantity)
    {
        quantity = parseInt(quantity)
        if (quantity < 0)
        {
            this._removeItemsFromInventory(itemId, quantity)
        }
        else
        {
            this._addItemsToInventory(itemId, quantity)
        }
    },

    _addItemsToInventory(itemId, quantity)
    {
        if (quantity < 0) { throw Error(`Quantity ${quantity} must be positive`) }

        let inventory = this.STATE.player.inventory
        if (itemId in inventory)
        {
            inventory[itemId] += parseInt(quantity)
        }
        else
        {
            inventory[itemId] = parseInt(quantity)
        }
    },

    _removeItemsFromInventory(itemId, quantity)
    {
        if (quantity >= 0) { throw Error(`Quantity ${quantity} must be negative`) }
        
        let inventory = this.STATE.player.inventory

        if (!(itemId in inventory)) { return }

        inventory[itemId] += quantity

        if (inventory[itemId] <= 0) { delete inventory[itemId] }
    }
}
