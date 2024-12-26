/*
	Note: The order in which actions appear in this data is the order in which they will be displayed on the UI.
		TODO: Add some kind of logic to allow this data to specify the order of the locations.
			> That or have the UI always group action types (search, travel, attack, etc.).
*/
const LOCATIONS = [
    {
        "id": "PLAYERCABIN",
        "name": "Player Cabin",
        "description": "A simple one room log cabin in the trees on the edge of Thistlewood.",
        "actions": [
            "TRAVEL_THISTLEWOOD"
        ]
    },
    {
        "id": "THISTLEWOOD",
        "name": "Thistlewood",
        "description": "A small town in the woods.",
        "actions": [
            "TRAVEL_PLAYERCABIN",
            "TRAVEL_THISTLEWOODFOREST"
        ]
    },
    {
        "id": "THISTLEWOODFOREST",
        "name": "Thistlewood Forest",
        "description": "A forest of mossy stones and thistles beneath towering pines.",
        "actions": [
            "SEARCH_THISTLEWOODFOREST",
            "TRAVEL_THISTLEWOOD"
        ]
    }
]