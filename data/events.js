const Events = {
    /*
        Generates an event detailing a change in HP.
    */
   generateHpChangeEvent: function(hpDelta)
   {
        console.log("AT: Events.generateHpChangeEvent()");
        
        return {
            name: "HP_CHANGE_EVENT",
            HPDelta: hpDelta
        }
    },
    generateInventoryUpdateEvent: function(items)
    {
        console.log("AT: Events.generateInventoryUpdateEvent()");

        return {
            name: "INVENTORY_UPDATE_EVENT",
            // TODO: Implement this event.
        }
   }
}