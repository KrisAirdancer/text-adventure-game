import Game from './game.js'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

let corsOptions = {
  origin: 'http://127.0.0.1:4200'
}
app.use(cors(corsOptions))

/***** GAME INITIALIZATION *****/

let GAME = new Game()
// console.log(GAME.LOCATIONS)

/***** ROUTES *****/

// app.get('/location', cors(corsOptions), (req, res) => {
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