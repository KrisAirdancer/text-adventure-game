import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default class Game
{
    LOCATIONS = {}
    ACTIONS = {}
    STATE = {
        currentLocationId: "PLAYERCABIN"
        // TODO: Add currentHp, maxHp, inventory, etc.
    }

    constructor()
    {
        this.loadData()
    }

    loadData()
    {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)

        // Load locations data
        let filePath = path.resolve(__dirname, './data/locations.json')
        let fileData = fs.readFileSync(filePath, 'utf-8')
        const locationsJSON = JSON.parse(fileData)

        locationsJSON.forEach(location => {
            this.LOCATIONS[location['id']] = location
        })

        // Load actions data
        filePath = path.resolve(__dirname, './data/actions.json')
        fileData = fs.readFileSync(filePath, 'utf-8')
        const actionsJSON = JSON.parse(fileData)

        actionsJSON.forEach(action => {
            this.ACTIONS[action['id']] = action
        })
    }

    handleAction(actionId)
    {
        const action = this.ACTIONS[actionId]

        if (action.travelDestinationId)
        {
            this.STATE.currentLocationId = action.travelDestinationId
        }

        let currentLocation = this.LOCATIONS[this.STATE.currentLocationId]
        let response = {
            currentLocation: JSON.parse(JSON.stringify(currentLocation))
        }

        let actionObjects = []
        response.currentLocation.actions.forEach(actionId => {
            actionObjects.push(this.ACTIONS[actionId])
        })
        response.currentLocation.actions = actionObjects

        return response
    }
}