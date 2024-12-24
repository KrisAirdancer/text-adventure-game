const LOCATIONS_DATA = [
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
            "TRAVEL_THISTLEWOOD",
            "SEARCH_THISTLEWOODFOREST"
        ]
    }
]