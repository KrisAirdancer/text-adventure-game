export type Location = {
    id: number
    name: string
    description: string
    connectedLocations: number[]
    actions: Action[]
    // TODO: Add proper return type to the visit function.
    visit: () => any
}

export type Action = {
    id: number
    name: string
    // TODO: Add a proper return type to the handler.
    handler: () => any
}