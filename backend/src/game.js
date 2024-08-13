import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { aborted } from 'util'

export default class Game
{
    LOCATIONS = {}
    ACTIONS = {}
    STATE = {
        currentLocationId: "PLAYERCABIN",
        currentDateTime: {
            currentTime: 0, // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
            dayNumber: 0,
            monthNumber: 0, // The month of the current year. 1-12
            monthOfSeason: 0, // The current month of the current season. 1-3
            season: "SPRING",
            yearNumber: 0
        }
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

        this.updateTime(43200)

        if (action.travelDestinationId)
        {
            return this.handleTravelAction(action)
        }
    }

    updateTime(duration)
    {
        // TODO: Add logic to update monthOfSeason field.
        // TODO: Add logic to display the date on the UI in human-readable format: "11:45AM on the 3rd day of Spring, year 4"
        // > This will reaquire converting minutes to a time, and the year, month, and day-of-month numbers to 1-indexed values.


        if (duration < 0) { throw Error(`Duration must be greater than zero. Got ${duration}`) }

        let date = this.STATE.currentDateTime
        
        let minutes = date.currentTime + duration

        // Update minutes
        date.currentTime = minutes % 1440
        let daysPassed = ((minutes - date.currentTime) / 1440) + date.dayNumber
        console.log("daysPassed: ", daysPassed)

        // Update days
        date.dayNumber = daysPassed % 30
        let monthsPassed = ((daysPassed - date.dayNumber) / 30) + date.monthNumber
        console.log("monthsPassed: ", monthsPassed)

        // Update years
        date.monthNumber = monthsPassed % 12
        let yearsPassed = ((monthsPassed - date.monthNumber) / 12) + date.yearNumber
        console.log("yearsPassed: ", yearsPassed)
        date.yearNumber = yearsPassed

        if (date.monthNumber >= 0 && date.monthNumber <= 2) { date.season = "SPRING" }
        else if (date.monthNumber >= 3 && date.monthNumber <= 5) { date.season = "SUMMER" }
        else if (date.monthNumber >= 6 && date.monthNumber <= 8) { date.season = "FALL" }
        else if (date.monthNumber >= 9 && date.monthNumber <= 11) { date.season = "WINTER" }
        else { throw Error(`monthNumber ${date.monthNumber} not in the valid range of 0-11`) }

        console.log("currentTime: ", date)
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