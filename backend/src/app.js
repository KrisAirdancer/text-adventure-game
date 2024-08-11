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
// console.log(GAME.ACTIONS)

/***** ROUTES *****/

// TODO: This, and most of the requests, should be POST requests b/c they are updating the state of the backend.
app.get('/action', (req, res) => {
  const actionId = req.query.actionId
  console.log(actionId)

  if (actionId in GAME.ACTIONS)
  {
    res.send(GAME.handleAction(actionId))
  }
  else
  {
    res.status(404).send(`action_id ${actionId} not a valid action`)
  }
})

app.listen(
    PORT,
    () => {console.log(`Listening at http://localhost:${PORT}`)}
)