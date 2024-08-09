import Game from './game.js'
import express from 'express'

const app = express()
const PORT = 3000

/***** GAME INITIALIZATION *****/

let GAME = new Game()

/***** ROUTES *****/

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(
    PORT,
    () => {console.log(`Listening at http://localhost:${PORT}`)}
)