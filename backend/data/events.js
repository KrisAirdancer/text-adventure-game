const Events = {
    /*
        Generates an event detailing a change in HP.
    */
   generateHpChangeEvent: function(HPDelta)
   {
        return {
            name: "HP_CHANGE_EVENT",
            HPDelta: HPDelta
        }
   },
   generateInventoryUpdateEvent: function(items)
   {
        return {
            name: "INVENTORY_UPDATE_EVENT",
            // TODO:
        }
   }
}