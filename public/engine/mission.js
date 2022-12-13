class Mission {
    constructor() {
        this.missions = [
            {
                id: 1,
                action: 'talk',
                to: 'jo',
                mission: 1,
                complete: false,
                err: "Jo wanted to talk first!"
            },
            {
                id: 2,
                action: 'interact',
                to: 's1',
                mission: 1,
                complete: false,
                err: "Touch the shelf!"
            }
        ]

        this.missionOrder = 1
    }
    getMission(id) {
        return this.missions.find(e => e.id == id)
    }
}