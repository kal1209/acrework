class Mission {
    constructor() {
        this.missions = [
            {
                id: 1,
                action: 'talk',
                to: 'jo',
                order: 1,
                complete: false,
                err: "Deny, delay, desist. Also, Jo wanted to talk first."
            },
            {
                id: 2,
                action: 'interact',
                to: 's1',
                order: 1,
                complete: false,
                err: "Touch the shelf!"
            }
        ]

        this.order = 1
    }
    getMission(id) {
        return this.missions.find(e => e.id == id)
    }
}