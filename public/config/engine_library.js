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
                investigate: {
                    msg: "These steps creak so badly.\nThey make midnight-raids on the\nkitchen almost impossible."
                }
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
                name: 'frame_int_text',
                url: 'frame_int_text.webp',
                depth: 10,
            },
            {
                name: 'frame_popup',
                url: 'frame_popup.webp',
                depth: 10,
            },
            {
                name: 'investigate',
                url: 'investigate.webp',
                depth: 10,
            },
            {
                name: 'interact',
                url: 'interact.webp',
                depth: 10,
            }
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
    addObject(scene, x, y, item) { // add object such as location, widget, character, etc
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
                this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, item.title)
                this.showActionBtns()
                this.setInvestigateMsg(item.investigate ? item.investigate.msg : '')
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
        this.tooltip.add(scene.add.sprite(0, 0, this.getUI('frame_objname_gold').name)) // index: 0
        this.tooltip.add(scene.add.text(0, -5, '', { font: "bold 32px Arial", fill: "#fff" }).setOrigin(0.5)) // index: 1

        // add investigate circle button
        this.tooltip.add(scene.add.sprite(-60, -100, this.getUI('investigate').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideActionBtns()
            this.showActionMsg()
        }).on('pointerover', () => {
            this.showActionInfoBar('investigate')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 2

        // add action info bar
        this.tooltip.add(scene.add.sprite(0, 80, this.getUI('frame_int_text').name).setAlpha(0)) // index: 3
        this.tooltip.add(scene.add.text(0, 80, '', { font: "bold 28px Arial ", fill: "#000" }).setOrigin(0.5).setAlpha(0)) // index: 4

        // add investigate info
        this.tooltip.add(scene.add.sprite(0, 300, this.getUI('frame_popup').name).setAlpha(0)) // index: 5
        this.tooltip.add(scene.add.text(0, 300, '', { font: "bold 28px Arial", fill: "#000", align: 'center' }).setOrigin(0.5).setAlpha(0)) // index: 6

        // add interact circle button
        this.tooltip.add(scene.add.sprite(60, -100, this.getUI('interact').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideActionBtns()
        }).on('pointerover', () => {
            this.showActionInfoBar('interact')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 7
    }
    showTooltip(x, y, title) {
        this.tooltip.setPosition(x, y)
        this.tooltip.setAlpha(1)
        this.tooltip.list[1].setText(title)
    }
    hideTooltip() {
        this.tooltip.setAlpha(0)
        this.hideActionBtns()
        this.hideActionMsg()
        this.hoverDisabled = false
    }
    showActionBtns() { // such as investigate, interact, 
        this.tooltip.list[2].setAlpha(1)
        this.tooltip.list[7].setAlpha(1)
    }
    hideActionBtns() {
        this.tooltip.list[2].setAlpha(0)
        this.tooltip.list[7].setAlpha(0)
    }
    showActionInfoBar(title) {
        this.tooltip.list[3].setAlpha(1)
        this.tooltip.list[4].setAlpha(1)
        this.tooltip.list[4].setText(title)
    }
    hideActionInfoBar() {
        this.tooltip.list[3].setAlpha(0)
        this.tooltip.list[4].setAlpha(0)
    }
    showActionMsg() {
        this.tooltip.list[5].setAlpha(1)
        this.tooltip.list[6].setAlpha(1)
    }
    hideActionMsg() {
        this.tooltip.list[5].setAlpha(0)
        this.tooltip.list[6].setAlpha(0)
    }
    setInvestigateMsg(msg) {
        this.tooltip.list[6].setText(msg)
        this.hideActionMsg()
    }
}