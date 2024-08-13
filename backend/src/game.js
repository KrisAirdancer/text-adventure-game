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
            minutes: 0, // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
            time: "12:00 AM",
            day: 0, // The day number of the current month. 0-29
            month: 0, // The month number of the current year. 0-11
            monthOfSeason: 0, // The current month of the current season. 0-2
            season: "SPRING",
            year: 0 // The year number.
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

        this.updateTime(10)

        if (action.travelDestinationId)
        {
            return this.handleTravelAction(action)
        }
    }

    updateTime(duration)
    {
        if (duration < 0) { throw Error(`Duration must be greater than zero. Got ${duration}`) }

        let date = this.STATE.currentDateTime
        let minutesPassed = date.minutes + duration

        // Update minutes
        // TODO: Check that this is rolling over at 1440. That is, thre should never be a 1440, only a 1439. 1440 becomes 0 of the next day.
        date.minutes = minutesPassed % 1440
        let daysPassed = ((minutesPassed - date.minutes) / 1440) + date.day

        // Update days
        date.day = daysPassed % 30
        let monthsPassed = ((daysPassed - date.day) / 30) + date.month

        // Update years
        date.month = monthsPassed % 12
        let yearsPassed = ((monthsPassed - date.month) / 12) + date.year
        date.year = yearsPassed

        // Update season
        if (date.month >= 0 && date.month <= 2) { date.season = "SPRING" }
        else if (date.month >= 3 && date.month <= 5) { date.season = "SUMMER" }
        else if (date.month >= 6 && date.month <= 8) { date.season = "FALL" }
        else if (date.month >= 9 && date.month <= 11) { date.season = "WINTER" }
        else { throw Error(`monthNumber ${date.month} not in the valid range of 0-11`) }

        // Update monthOfSeason
        if (date.month % 3 === 0) { date.monthOfSeason = 0 }
        else if (date.month % 3 === 1) { date.monthOfSeason = 1 }
        else if (date.month % 3 === 2) { date.monthOfSeason = 2 }
        else { throw Error("Unable to set monthOfSeason") }

        // Generate human-readable time.
        let period = ""
        let m = date.minutes % 60
        let h = (date.minutes - m) / 60
        if (h < 12) { period = "AM" }
        if (h >= 12) { period = "PM" }
        if (h === 0) { h = 12 }
        if (h > 12) { h = h % 12 }
        date.time = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString() + " " + period
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

// NEXT: Finish implementing getResponseState()
// > The function should take in options that specify which data to include in the response object.
// > The logic in thte getResponseFunction() should replace the logic in the handleTravelAction() function above.
// > Ultimately, the getResponseFunction() function should be the only one that is building the response. All other logic should only modify the STATE object.