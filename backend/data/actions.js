const ACTIONS = [
    {
        "id": "TRAVEL_THISTLEWOOD",
        "name": "Travel to Thistlewood",
        "description": "Travels the player to Thistlewood.",
        "travelDestinationId": "THISTLEWOOD"
    },
    {
        "id": "TRAVEL_PLAYERCABIN",
        "name": "Travel to Your Cabin",
        "description": "Travels the player to their cabin in Thistlewood.",
        "travelDestinationId": "PLAYERCABIN"
    },
    {
        "id": "TRAVEL_THISTLEWOODFOREST",
        "name": "Travel to Thistlewood Forest",
        "description": "Travels the player to Thistlewood Forest.",
        "travelDestinationId": "THISTLEWOODFOREST"
    },
    {
        "id": "SEARCH_THISTLEWOODFOREST",
        "name": "Search Thistlewood Forest",
        "description": "Searches Thistlewood Forest for items.",
        "search": {
            "maxItems": 3,
            "notificationTextTemplate": "You find <numFound> <itemName>.",
            "noItemsFoundText": "You find nothing of interest.",
            "items": [
                {
                    "itemId": "MORELMUSHROOMS",
                    "minQuantity": 1,
                    "maxQuantity": 2,
                    "probability": 25
                },
                {
                    "itemId": "STICKS",
                    "minQuantity": 1,
                    "maxQuantity": 3,
                    "probability": 50
                },
                {
                    "itemId": "COPPERCOINS",
                    "minQuantity": 1,
                    "maxQuantity": 5,
                    "probability": 10
                }
            ]
        }
    }
]