import express, { Express, Request, Response } from "express";
import { Locations } from "./locations/locations.js";
import { Game } from './game.js'

const app: Express = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    Game.initialize();
    console.log(Game.LocationValues);

    res.send("Hello, World!");
})

app.listen(
    PORT,
    () => console.log(`listening on http://localhost:${PORT}`)
)