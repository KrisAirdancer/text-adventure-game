import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import utils from './utils.js'

export default class Game
{
    LOCATIONS = {}
    ACTIONS = {}
    ITEMS = {}
    STATE = {
        currentLocationId: "PLAYERCABIN",
        currentDateTime: {
            minutes: 450, // Minutes since midnight. When 1440 is reached, rollover to 0. That is, go from 1439 to 0 (of the next day).
            time: "7:30 AM",
            day: 0, // The day number of the current month. 0-29
            month: 0, // The month number of the current year. 0-11
            monthOfSeason: 0, // The current month of the current season. 0-2
            season: "SPRING",
            year: 0 // The year number.
        },
        player: {
            // TODO: Add currentHp, maxHp, inventory, etc.
            inventory: {
                "COPPERCOINS": 100,
                "BRONZEAXE": 1,
                "LEATHERBOOTS": 1
            }
        },
        notifications: []
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

        // Load items data
        filePath = path.resolve(__dirname, './data/items.json')
        fileData = fs.readFileSync(filePath, 'utf-8')
        const itemsJSON = JSON.parse(fileData)

        itemsJSON.forEach(item => {
            this.ITEMS[item['id']] = item
        })
    }

    // TODO: handleAction() is currently being used as the primary entrypoint to the Game object.
    // > However, it might make more sense to have a function, such as "processGameCycle()", that can take in an action object (and other objects/options) that runs the full game cycle.
    handleAction(actionId)
    {
        const action = this.ACTIONS[actionId]

        // Clear old notifications.
        this.STATE.notifications = []

        this.updateTime(10)

        if (action.travelDestinationId)
        {
            this.handleTravelAction(action)
        }
        if (action.search)
        {
            this.handleSearchAction(action)
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
        this.STATE.currentLocationId = action.travelDestinationId
    }

    handleSearchAction(action)
    {
        const searchAction = action.search

        const numFound = 3

        // The data in the JSON files is read-only (or should at least be treated as such). So we make a copy of the data to prevent modification of the reference.
        let items = JSON.parse(JSON.stringify(searchAction.items))
        utils.shuffleArray(items)

        const searchValue = utils.getRandomInt(1, 100)

        let itemsFound = false
        let inventory = this.STATE.player.inventory
        for (let i = 0; i < numFound; i++)
        {
            let currentItem = items[i]

            if (searchValue <= currentItem.probability)
            {
                itemsFound = true
                if (currentItem.itemId in inventory)
                {
                    let quantity = utils.getRandomInt(currentItem.minQuantity, currentItem.maxQuantity)
                    inventory[currentItem.itemId] += quantity
                    this.STATE.notifications.push(utils.buildNotificationText(searchAction.notificationTextTemplate, [quantity, quantity > 1 ? this.ITEMS[currentItem.itemId].namePlural : this.ITEMS[currentItem.itemId].nameSingular]))
                }
                else
                {
                    let quantity = utils.getRandomInt(currentItem.minQuantity, currentItem.maxQuantity)
                    inventory[currentItem.itemId] = quantity
                    this.STATE.notifications.push(utils.buildNotificationText(searchAction.notificationTextTemplate, [quantity, quantity > 1 ? this.ITEMS[currentItem.itemId].namePlural : this.ITEMS[currentItem.itemId].nameSingular]))
                }
            }            
        }
        
        if (!itemsFound)
        {
            this.STATE.notifications.push(searchAction.noItemsFoundText)
        }
    }

    getResponseState()
    {
        let state = JSON.parse(JSON.stringify(this.STATE))

        // Shift datetime to 1-indexed format.
        state.currentDateTime.day += 1
        state.currentDateTime.month += 1
        state.currentDateTime.monthOfSeason += 1
        state.currentDateTime.year += 1

        // Add the current location's data.
        state.currentLocation = JSON.parse(JSON.stringify(this.LOCATIONS[this.STATE.currentLocationId]))

        // Populate the actions data for the current location.
        let actionObjects = []
        state.currentLocation.actions.forEach(actionId => {
            actionObjects.push(this.ACTIONS[actionId])
        })
        state.currentLocation.actions = actionObjects

        // Remove duplicate/unnecessary fields.
        delete state.currentLocationId

        return state
    }
}
