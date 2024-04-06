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
            // "method": "GET",
            "method": "POST",
            "route": "location/1?action_id=1",
            // "route": "location/3",
            "body": {

            }
        }));
        console.log("response: ", response);
        
        // Convert response JSON string into an object.
        response = JSON.parse(response);
        console.log("post parsing: ", response);
    }
}