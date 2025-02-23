let STATE = {
	stateData:
	{
		currentLocationId: "PLAYERCABIN",
		currentDateTime:
		{
			minutes: 450, // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
			time: "7:30 AM",
			day: 0, // The day number of the current month. 0-29
			month: 0, // The month number of the current year. 0-11
			monthOfSeason: 0, // The current month of the current season. 0-2
			season: "SPRING",
			year: 0 // The year number.
		},
		player:
		{
			// TODO: Add currentHp, maxHp, inventory, etc.
			inventory:
			{
				"COPPERCOINS": 100,
				"BRONZEAXE": 1,
				"LEATHERBOOTS": 1,
				"BRONZEBUCKLER": 1,
				"LEATHERGLOVES": 1,
				"GOLDNECKLACE": 1,
				"BRONZECHAINMAILSHIRT": 1,
				"BRONZECHAINMAILCOIF": 1,
				"LEATHERLEGS": 1,
				"LEATHERBOOTS": 1,
				"GOLDRING": 1,
				"STICKS": 3
			},
			equipment:
			{
				HEAD: null,
				NECK: null,
				BODY: null,
				HANDS: null,
				ON_HAND: null,
				OFF_HAND: null,
				RING: null,
				LEGS: null,
				FEET: null,
			}
		},
		notifications: [],
	},
	enums:
	{
		equipment:
		{
			HEAD: "HEAD",
			NECK: "NECK",
			BODY: "BODY",
			HANDS: "HANDS",
			ON_HAND: "ON_HAND",
			OFF_HAND: "OFF_HAND",
			RING: "RING",
			LEGS: "LEGS",
			FEET: "FEET",
		}
	},
	
	_getStateData()
	{
		return UTILS.copyData(this.stateData);
	},

	_getInventory()
	{
		return UTILS.copyData(this.stateData.player.inventory);
	},

	_addNotification(notificationText)
	{
		this.stateData.notifications.push(notificationText);
	},

	_clearNotifications()
	{
		this.stateData.notifications = [];
	},

	_getCurrentDateTime()
	{
		return UTILS.copyData(this.stateData.currentDateTime);
	},

	_getCurrentLocation()
	{
		return DATA._getLocation(this.stateData.currentLocationId);
	},

	_setCurrentLocation(locationId)
	{
		this.stateData.currentLocationId = locationId;
	},

	_updateTime(duration)
    {
        if (duration < 0) { throw Error(`Duration must be greater than zero. Got ${duration}`) }

        let date = this.stateData.currentDateTime;
        let minutesPassed = date.minutes + duration;

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

	_updateInventory(inventoryUpdates)
    {
		console.log("AT: GAME._updateInventory()");

		if (!inventoryUpdates) { return; }
		for (const [itemId, delta] of Object.entries(inventoryUpdates))
		{
			if (delta < 0)
			{
				this._removeItemsFromInventory(itemId, delta)
			}
			else
			{
				this._addItemsToInventory(itemId, delta)
			}
		};
    },

    _addItemsToInventory(itemId, quantity)
    {
        if (quantity < 0) { throw Error(`Quantity ${quantity} must be positive`); }

        let inventory = this.stateData.player.inventory;
        if (itemId in inventory)
        {
            inventory[itemId] += parseInt(quantity);
        }
        else
        {
            inventory[itemId] = parseInt(quantity);
        }
    },

    _removeItemsFromInventory(itemId, quantity)
    {
        if (quantity >= 0) { throw Error(`Quantity ${quantity} must be negative`); }
        
        let inventory = this.stateData.player.inventory;
		const item = DATA._getItem(itemId);
		console.log("item: ", item);

        if (!(itemId in inventory)) { return }

        inventory[itemId] += quantity;

        if (inventory[itemId] <= 0)
		{
			// Remove the inventory entry.
			delete inventory[itemId];
			// Remove the item from player's equipment.
			STATE._setEquipment(item.type, null);
		}
    },

	_isItemInInventory(itemId)
	{
		return itemId in this.stateData.player.inventory;
	},

	_isItemEquipped(equipmentSlot, itemId)
	{
		return this.stateData.player.equipment[equipmentSlot] === itemId;
	},

	_setEquipment(equipmentSlot, itemId)
	{
		this.stateData.player.equipment[equipmentSlot] = itemId;
	},

	_getEnums()
	{
		return UTILS.copyData(this.enums);
	},
}