let engine = new Engine();

var TestScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "TestScene" });
    },
    init: function () { },
    preload: function () {
        for (const elem of engine.items) {
            this.load.image(`${elem.name}`, `../assets/images/${elem.type}/${elem.url}`)
        }
    },
    create: async function () {
        // add location
        engine.addItem(this, 0, 0, engine.getItem('kitchen'))

        // add stairs
        engine.addItem(this, 0, 0, engine.getItem('stairs'))

        engine.addItem(this, 1425, 182, engine.getItem('closet'))

        engine.addItem(this, 614, 260, engine.getItem('clock'))

        engine.addItem(this, 367, 225, engine.getItem('furniture_01'))

        engine.addItem(this, 1028, 524, engine.getItem('furniture_03'))

        // add drawers
        engine.addItem(this, 1589, 682, engine.getItem('d1'))
        engine.addItem(this, 1449, 728, engine.getItem('d3'))
        engine.addItem(this, 448, 668, engine.getItem('d2'))

        engine.addItem(this, 1499, 258, engine.getItem('s1'))

        // let widget = engine.getItem('closet');
        // this.add.sprite(1500, 200, widget.name).setInteractive({
        //     useHandCursor: widget.interactable,
        //     pixelPerfect: true
        // }).setOrigin(0, 0).setDepth(widget.depth)
    },
});