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
    // TODO: Update this function to aggregate item counts into a single entry for each item ID.
    generateInventoryUpdateEvent: function(itemDeltas)
    {
        console.log("AT: Events.generateInventoryUpdateEvent()");

        return {
            name: "INVENTORY_UPDATE_EVENT",
            itemDeltas: itemDeltas
        }
   }
}