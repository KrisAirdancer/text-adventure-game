let Frontend = {
    initialize: function()
    {
        console.log("AT: Frontend.initialize()");

        // Nothing to initialize...

        console.log("Frontend successfully initialized.");
    },
    send: function()
    {
        console.log("AT: send()");
        
        // JSON.stringify() required to ensure that the data is sent, not an object reference.
        let response = Backend.sendRequest(JSON.stringify({
            "method": "GET",
            // "route": "location/1?action_id=3",
            "route": "location/1",
        }));
        console.log("response: ", response);
        
        // Convert response JSON string into an object.
        response = JSON.parse(response);
        console.log("post destringing: ", response);
        response.location.actions = [];
    }
}