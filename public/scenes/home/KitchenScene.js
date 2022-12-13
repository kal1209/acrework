var KitchenScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "KitchenScene" });
    },
    init: function () {
        this.engine = gameEngine;

        this.objects = [
            {
                name: 'kitchen',
                pos: {
                    x: 0,
                    y: 0
                },
                depth: 1
            },
            {
                name: 'stairs',
                pos: {
                    x: 0,
                    y: 0
                },
                depth: 3
            },
            {
                name: 'door',
                pos: {
                    x: 175,
                    y: 196
                },
                depth: 2,
                dir: 'EntranceScene'
            },
            {
                name: 'closet',
                pos: {
                    x: 1425,
                    y:  182
                },
                depth: 2
            },
            {
                name: 'clock',
                pos: {
                    x: 614,
                    y:  260
                },
                depth: 2
            },
            {
                name: 'furniture_01',
                pos: {
                    x: 367,
                    y: 225
                },
                depth: 2
            },
            {
                name: 'furniture_03',
                pos: {
                    x: 1028,
                    y: 524
                },
                depth: 2
            },
            {
                name: 'd1',
                pos: {
                    x: 1589,
                    y: 682
                },
                depth: 2
            },
            {
                name: 'd3',
                pos: {
                    x: 1449,
                    y: 728
                },
                depth: 2
            },
            {
                name: 'd2',
                pos: {
                    x: 448,
                    y: 668
                },
                depth: 2
            },
            {
                name: 's1',
                pos: {
                    x: 1499,
                    y: 258
                },
                depth: 2
            },
            {
                name: 'counter',
                pos: {
                    x: 577,
                    y: 595
                },
                depth: 2
            },
            {
                name: 'mf',
                pos: {
                    x: 833,
                    y: 670
                },
                depth: 2
            },
            {
                name: 'barstool_1',
                pos: {
                    x: 1242,
                    y: 608
                },
                depth: 2
            },
            {
                name: 'barstool_1',
                pos: {
                    x: 1093,
                    y: 647
                },
                depth: 2
            },
            {
                name: 'jo',
                pos: {
                    x: 655,
                    y: 392
                },
                depth: 2
            }
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