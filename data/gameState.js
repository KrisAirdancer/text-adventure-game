// This object represents the game state.
let GameState = {
    player: {
        currentLocation: "id_1",
        hitPoints: 5,
        maxHitPoints: 10,
        // Inventory is a dictionary.
        inventory: {
            "id_1": 100 // The player has 100 of the item with ID=1.
        },
        equipment: {
            HEAD: null,
            NECK: null,
            BODY: null,
            HANDS: null,
            ON_HAND: null,
            OFF_HAND: null,
            RING: null,
            LEGS: null,
            FEET: null
        }
    },
    events: []
}