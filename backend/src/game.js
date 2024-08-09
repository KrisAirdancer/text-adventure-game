import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default class Game
{
    LOCATIONS = undefined

    constructor()
    {
        this.loadData()
    }

    loadData()
    {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const filePath = path.resolve(__dirname, './data/locations.json')
        let fileData = fs.readFileSync(filePath, 'utf-8')
        this.LOCATIONS = JSON.parse(fileData)
    }
}