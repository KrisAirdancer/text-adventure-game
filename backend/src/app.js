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

/***** ROUTES *****/

// TODO: This, and most of the requests, should be POST requests b/c they are updating the state of the backend.
app.get('/action', (req, res) => {
  const actionId = req.query.actionId
  console.log(actionId)

  if (actionId in GAME.ACTIONS)
  {
    GAME.handleAction(actionId)
    res.send(GAME.getResponseState())
  }
  else
  {
    res.status(404).send(`action_id ${actionId} not a valid action`)
  }
})

// TODO: This endpoint should be removed. It is being replaced with /inventory/drop
app.put('/inventory', (req, res) => {
  const itemId = req.query.itemId
  const quantity = req.query.quantity

  GAME.updateInventory(itemId, quantity)

  res.send(GAME.getResponseState())
})

app.listen(
    PORT,
    () => {console.log(`Listening at http://localhost:${PORT}`)}
)
