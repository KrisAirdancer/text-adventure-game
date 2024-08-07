import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
})

app.listen(
    PORT,
    () => console.log(`listening on http://localhost:${PORT}`)
)