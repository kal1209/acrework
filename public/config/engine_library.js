class Engine {
    constructor() {
        this.items = [
            // locations
            {
                name: 'bathroom',
                type: 'location',
                url: 'bathroom.webp',
                depth: 1,
                interactable: false,
                draggable: false,

            }, {
                name: 'bedroom',
                type: 'location',
                url: 'bedroom.webp',
                depth: 1,
                interactable: false,
                draggable: false,
            }, {
                name: 'homehall',
                type: 'location',
                url: 'homehall.webp',
                depth: 1,
                interactable: false,
                draggable: false,
            }, {
                name: 'kitchen',
                type: 'location',
                url: 'kitchen.webp',
                depth: 1,
                interactable: false,
                draggable: false,
            },
            // widgets
            {
                name: 'stairs',
                type: 'widget',
                url: 'stairs.webp',
                depth: 3,
                interactable: true,
                title: 'Stairs',
                draggable: true,
            },
            {
                name: 'clock',
                type: 'widget',
                url: 'clock.webp',
                depth: 2,
                interactable: false,
                draggable: true,
            },
            {

                name: 'closet',
                type: 'widget',
                url: 'closet.webp',
                depth: 2,
                interactable: false,
                draggable: true,
            },
            {
                name: 'furniture_03',
                type: 'widget',
                url: 'furniture_03.webp',
                depth: 2,
                interactable: false,
                draggable: true,
            },
            {
                name: 'furniture_01',
                type: 'widget',
                url: 'furniture_01.webp',
                depth: 2,
                interactable: false,
                draggable: true,
            },
            {
                name: 'd1',
                type: 'widget',
                url: 'd1.webp',
                depth: 2,
                interactable: true,
                title: 'Drawer',
                draggable: true,
            },
            {
                name: 'd3',
                type: 'widget',
                url: 'd3.webp',
                depth: 2,
                interactable: true,
                title: 'Drawer',
                draggable: true,
            },
            {
                name: 'd2',
                type: 'widget',
                url: 'd2.webp',
                depth: 2,
                interactable: true,
                title: 'Drawer',
                draggable: true,
            },
            {
                name: 's1',
                type: 'widget',
                url: 's1.webp',
                depth: 2,
                interactable: true,
                title: 'Shelf',
                draggable: true,
            },
        ]

        this.ui = [
            {
                name: 'frame_objname_gold',
                url: 'frame_objname_gold.webp',
                depth: 10,
            }
        ]

        this.tooltip = undefined
    }
    getItem(name) {
        return this.items.find(e => e.name == name)
    }
    getUI(name) {
        return this.ui.find(e => e.name == name)
    }
    addItem(scene, x, y, item) {
        let tmp = scene.add.sprite(x, y, item.name).setInteractive({
            // draggable: item.draggable,
            draggable: false,
            useHandCursor: item.interactable,
            pixelPerfect: true
        }).setOrigin(0, 0).setDepth(item.depth).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            console.log([item.name, dragX, dragY])
        }).on('pointerover', () => {
            if (item.interactable) {
                this.tooltip.setPosition(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100)
                this.tooltip.list[1].setText(item.title)
                this.tooltip.setAlpha(1)
            }
        }).on('pointerout', () => {
            this.tooltip.setAlpha(0)
        })
    }
    initTooltip(scene, infoBg) {
        this.tooltip = scene.add.container(100, 100).setDepth(10).setAlpha(0)
        this.tooltip.add(scene.add.sprite(0, 0, infoBg.name))
        this.tooltip.add(scene.add.text(0, -5, '', { font: "bold 32px Arial", fill: "#fff" }).setOrigin(0.5))
    }
}