let Game = {
    initialize: function()
    {
        console.log("AT: Game.initialize()");

        // Nothing to initialize...

        console.log("Game successfully initialized.");
    },
    reportEvent: function(event)
    {
        console.log("AT: Game.reportEvent()");

        console.log("event: ", event);

        GameState.events.push(event);
    },

    //  TODO: Implement functions that update the GameState here.

    updatePlayerHp: function(hpDelta)
    {
        console.log("AT: Game.updatePlayerHp()");

        let hitPoints = GameState.player.hitPoints;
        let maxHitPoints = GameState.player.maxHitPoints;

        let newHitPoints = hitPoints + hpDelta;
        
        if (newHitPoints > maxHitPoints) { newHitPoints = maxHitPoints; }
        if (newHitPoints < 0) { newHitPoints = 0; } // TODO: If HP drops to or below zero, the player is dead. Add logic to handle that.

        GameState.player.hitPoints = newHitPoints;

        Game.reportEvent(Events.generateHpChangeEvent(hpDelta));
    }
}