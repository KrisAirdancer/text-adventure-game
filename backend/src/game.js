import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default class Game
{
    LOCATIONS = {}
    ACTIONS = {}
    STATE = {
        currentLocationId: "PLAYERCABIN",
        currentTime: 0 // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
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

        this.updateTime(10)

        if (action.travelDestinationId)
        {
            return this.handleTravelAction(action)
        }
    }

    updateTime(duration)
    {
        if (duration < 0) { throw Error(`Duration must be greater than zero. Got ${duration}`) }

        this.STATE.currentTime += duration

        if (this.STATE.currentTime >= 1440)
        {
            this.STATE.currentTime = this.STATE.currentTime - 1440
        }

        console.log("currentTime: ", this.STATE.currentTime)
    }

    handleTravelAction(action)
    {
        console.log("AT: handleTravelAction()")

        this.STATE.currentLocationId = action.travelDestinationId

        let currentLocation = this.LOCATIONS[this.STATE.currentLocationId]
        let response = {
            currentLocation: JSON.parse(JSON.stringify(currentLocation))
        }

        let actionObjects = []
        response.currentLocation.actions.forEach(actionId => {
            actionObjects.push(this.ACTIONS[actionId])
        })
        response.currentLocation.actions = actionObjects

        console.log("STATE: ", this.STATE)
        return response
    }
}