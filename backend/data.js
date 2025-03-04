let DATA = {
	LOCATIONS: {},
	ACTIONS: {},
	ITEMS: {},

	_initialize()
	{
		this.LOCATIONS = LOCATIONS;

		this.ACTIONS = ACTIONS;

		this.ITEMS = ITEMS;
	},

	_getLocation(locationId)
	{
		return UTILS.copyData(this.LOCATIONS[locationId]);
	},

	_getAction(actionId)
	{
		return UTILS.copyData(this.ACTIONS[actionId]);
	},

	_getItem(itemId)
	{
		return UTILS.copyData(this.ITEMS[itemId]);
	}
}