const UTILS = {
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	getRandomInt(min, max)
	{
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
	},
	
	// Sources: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array AND https://bost.ocks.org/mike/shuffle/
	shuffleArray(array)
	{
		let currentIndex = array.length;
		
		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			
			// Pick a remaining element...
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
	},

	getPluralSingularItemName(itemNameSingular, itemNamePlural, quantity)
	{
		console.log("AT: UTILS.getPluralSingularItemName()");

		return quantity > 1 ? itemNamePlural : itemNameSingular;
	},

	getRouteTokens(route)
	{
		return route.substring(1).split("/");
	},

	// Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
	capitalizeFirstLetter(val) {
		return String(val).charAt(0).toUpperCase() + String(val).slice(1);
	},

	copyData(data)
	{
		return JSON.parse(JSON.stringify(data));
	},

	getTruncatedRoute(route, deleteCount)
	{
		let routeTokens = UTILS.getRouteTokens(route);
		return "/" + routeTokens.toSpliced(0, deleteCount).join("/");
	},
}