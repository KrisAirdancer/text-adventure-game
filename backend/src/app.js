import Game from './game.js'
import express from 'express'

const app = express()
const PORT = 3000

/***** GAME INITIALIZATION *****/

let GAME = new Game()
// console.log(GAME.LOCATIONS)

/***** ROUTES *****/

app.get('/location', (req, res) => {
  const location_id = req.query.location_id

  if (location_id in GAME.LOCATIONS)
  {
    res.send(GAME.LOCATIONS[location_id])
  }
  else
  {
    res.status(404).send(`location_id ${location_id} not a valid location`)
  }
})

app.listen(
    PORT,
    () => {console.log(`Listening at http://localhost:${PORT}`)}
)