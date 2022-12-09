var TestEntranceScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "TestEntranceScene" });
    },
    init: function () {
        this.engine = new Engine();

        this.objects = [
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
            this.engine.addObject(this, elem.pos, this.engine.getObject(elem.name), elem.depth)
        }
    },
});