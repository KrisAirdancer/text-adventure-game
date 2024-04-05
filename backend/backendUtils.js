let BackendUtils = {
    /*
        Returns a random integer between min (inclusive) and max (inclusive).
    */
    getRandomInt: function(min, max)
    {
        return Math.round(Math.random() * (max - min) + min);
    }
}