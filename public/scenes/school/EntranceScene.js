var EntranceScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EntranceScene" });
    },
    init: function () {
        this.engine = new Engine();

        this.objects = [
            {
                name: 'school',
                pos: {
                    x: 0,
                    y: 0
                },
                depth: 1
            },
        ]
    },
    preload: function () {
        // load the ui
        for (const elem of this.engine.ui) {
            this.load.image(`${elem.name}`, `../assets/images/ui/${elem.url}`)
        }

        // load the objects
        for (const elem of this.objects) {
            const e = this.engine.getObject(elem.name)
            this.load.image(`${e.name}`, `../assets/images/location/${e.url}`)
        }
    },
    create: async function () {
        this.engine.init(this)

        for (const elem of this.objects) {
            this.engine.addObject(
                this, 
                elem.pos, 
                this.engine.getObject(elem.name), 
                elem.depth, 
                elem.dir ? elem.dir : ''
            )
        }
    },
});