let Game = {
    start: function()
    {
        // Note: The frontend should send a request to the backend when it initializes to get the data it needs to initialize.
    },
    sendRequest: function(request)
    {
        console.log("AT: Game.sendRequest()")
        console.log("request:", request)

        return {
            location: "Thistlewood",
            playerData: {
                name: "KrisAirdancer",
                currentHP: "10",
                maxHP: "12",
                inventory: {
                    "leather coif": 1,
                    "bronse buckler": 1,
                    "bronze sword": 1
                }
            }
        }
    }
}