var TestKitchenScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "TestKitchenScene" });
    },
    init: function () {
        this.engine = new Engine();
    },
    preload: function () {
        // load the objects
        for (const elem of this.engine.objects) {
            this.load.image(`${elem.name}`, `../assets/images/${elem.type}/${elem.url}`)
        }

        // load the ui
        for (const elem of this.engine.ui) {
            this.load.image(`${elem.name}`, `../assets/images/ui/${elem.url}`)
        }
    },
    create: async function () {
        this.engine.initTooltip(this)

        // add location
        this.engine.addObject(this, 0, 0, this.engine.getObject('kitchen'), 1)

        // add stairs
        this.engine.addObject(this, 0, 0, this.engine.getObject('stairs'), 3)

        // add door
        this.engine.addObject(this, 175, 196, this.engine.getObject('door'), 2)

        this.engine.addObject(this, 1425, 182, this.engine.getObject('closet'), 2)

        this.engine.addObject(this, 614, 260, this.engine.getObject('clock'), 2)

        this.engine.addObject(this, 367, 225, this.engine.getObject('furniture_01'), 2)

        this.engine.addObject(this, 1028, 524, this.engine.getObject('furniture_03'), 2)

        // add drawers
        this.engine.addObject(this, 1589, 682, this.engine.getObject('d1'), 2)
        this.engine.addObject(this, 1449, 728, this.engine.getObject('d3'), 2)
        this.engine.addObject(this, 448, 668, this.engine.getObject('d2'), 2)

        this.engine.addObject(this, 1499, 258, this.engine.getObject('s1'), 2)

        // add counter
        this.engine.addObject(this, 577, 595, this.engine.getObject('counter'), 2)
        this.engine.addObject(this, 833, 670, this.engine.getObject('mf'), 2)

        // add chair
        this.engine.addObject(this, 1242, 608, this.engine.getObject('barstool_1'), 2)
        this.engine.addObject(this, 1093, 647, this.engine.getObject('barstool_1'), 2)

        // add mom (jo)
        this.engine.addObject(this, 655, 392, this.engine.getObject('jo'), 2)
    },
});