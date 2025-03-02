let DATA = {
	LOCATIONS: {},
	ACTIONS: {},
	ITEMS: {},

	_initialize()
	{
		// LOCATIONS.forEach(location => {
		// 	this.LOCATIONS[location['id']] = UTILS.copyData(location);
		// })
		this.LOCATIONS = LOCATIONS;

		// ACTIONS.forEach(action => {
		// 	this.ACTIONS[action['id']] = UTILS.copyData(action);
		// })
		this.ACTIONS = ACTIONS;

		// ITEMS.forEach(item => {
		// 	this.ITEMS[item['id']] = UTILS.copyData(item);
		// })
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