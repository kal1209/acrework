var EntranceScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EntranceScene" });
    },
    init: function () {
        this.engine = gameEngine;

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
            this.load.image(`${elem.name}`, `../engine/assets/ui/${elem.url}`)
        }
    },
    create: async function () {
        this.engine.init(this)

        // load the objects
        for (const elem of this.objects) {
            this.engine.addObject(
                elem.pos, 
                this.engine.getObject(elem.name), 
                elem.depth, 
                elem.dir ? elem.dir : ''
            )
        }
    },
});