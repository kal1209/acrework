var TestScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "TestScene" });
    },
    init: function () {
        this.engine = new Engine();
    },
    preload: function () {
        // load the item assets
        for (const elem of this.engine.items) {
            this.load.image(`${elem.name}`, `../assets/images/${elem.type}/${elem.url}`)
        }

        // load the ui assets
        for (const elem of this.engine.ui) {
            this.load.image(`${elem.name}`, `../assets/images/ui/${elem.url}`)
        }
    },
    create: async function () {
        this.engine.initTooltip(this)

        // add location
        this.engine.addItem(this, 0, 0, this.engine.getItem('kitchen'))

        // add stairs
        this.engine.addItem(this, 0, 0, this.engine.getItem('stairs'))

        // add door
        this.engine.addItem(this, 175, 196, this.engine.getItem('door'))

        this.engine.addItem(this, 1425, 182, this.engine.getItem('closet'))

        this.engine.addItem(this, 614, 260, this.engine.getItem('clock'))

        this.engine.addItem(this, 367, 225, this.engine.getItem('furniture_01'))

        this.engine.addItem(this, 1028, 524, this.engine.getItem('furniture_03'))

        // add drawers
        this.engine.addItem(this, 1589, 682, this.engine.getItem('d1'))
        this.engine.addItem(this, 1449, 728, this.engine.getItem('d3'))
        this.engine.addItem(this, 448, 668, this.engine.getItem('d2'))

        this.engine.addItem(this, 1499, 258, this.engine.getItem('s1'))

        // add counter
        this.engine.addItem(this, 577, 595, this.engine.getItem('counter'))
        this.engine.addItem(this, 833, 670, this.engine.getItem('mf'))
    },
});