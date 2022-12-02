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
                name: 'door',
                type: 'widget',
                url: 'door.webp',
                depth: 2,
                interactable: true,
                title: 'Door',
                draggable: true,
            },
            {
                name: 'counter',
                type: 'widget',
                url: 'counter.webp',
                depth: 2,
                interactable: false,
                draggable: true,
            },
            {
                name: 'mf',
                type: 'widget',
                url: 'mf.webp',
                depth: 2,
                interactable: true,
                title: 'Mini Fridge',
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
            },
            {
                name: 'investigate',
                url: 'investigate.webp',
                depth: 10,
            },
        ]

        this.tooltip = undefined
        this.hoverDisabled = false
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
        }).on('pointerup', () => {
            if (item.interactable) {
                this.hoverDisabled = true
                this.showActionTip()
            } else {
                this.hideTooltip()
            }
        }).on('pointerover', () => {
            if (item.interactable && !this.hoverDisabled) {
                this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, item.title)
            }
        }).on('pointerout', () => {
            if (!this.hoverDisabled) {
                this.hideTooltip()
            }
        })
    }
    initTooltip(scene) {
        this.tooltip = scene.add.container(100, 100).setDepth(10).setAlpha(0)
        this.tooltip.add(scene.add.sprite(0, 0, this.getUI('frame_objname_gold').name))
        this.tooltip.add(scene.add.text(0, -5, '', { font: "bold 32px Arial", fill: "#fff" }).setOrigin(0.5))

        this.tooltip.add(scene.add.sprite(0, -100, this.getUI('investigate').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            alert('investigate')
            this.hideTooltip()
        }))
    }
    showTooltip(x, y, title) {
        this.tooltip.setPosition(x, y)
        this.tooltip.setAlpha(1)
        this.tooltip.list[1].setText(title)
    }
    hideTooltip() {
        this.tooltip.setAlpha(0)
        this.hideActionTip()
        this.hoverDisabled = false
    }
    showActionTip() {
        this.tooltip.list[2].setAlpha(1)
    }
    hideActionTip() {
        this.tooltip.list[2].setAlpha(0)
    }
}