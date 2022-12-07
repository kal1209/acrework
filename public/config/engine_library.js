class Engine {
    constructor() {
        this.objects = [
            // locations
            {
                name: 'bathroom',
                type: 'location',
                url: 'bathroom.webp',
            }, 
            {
                name: 'bedroom',
                type: 'location',
                url: 'bedroom.webp',
            }, 
            {
                name: 'homehall',
                type: 'location',
                url: 'homehall.webp',
            }, 
            {
                name: 'kitchen',
                type: 'location',
                url: 'kitchen.webp',
            },
            // widgets
            {
                name: 'stairs',
                type: 'widget',
                url: 'stairs.webp',
                action: {
                    investigate: {
                        msg: "These steps creak so badly.\nThey make midnight-raids on the\nkitchen almost impossible."
                    },
                    interact: {}
                },
                title: 'Stairs',
            }, 
            {
                name: 'door',
                type: 'widget',
                url: 'door.webp',
                action: {
                    interact: {}
                },
                title: 'Door',
            }, 
            {
                name: 'barstool_1',
                type: 'widget',
                url: 'barstool_1.webp',
            },
            {
                name: 'counter',
                type: 'widget',
                url: 'counter.webp',
            },
            {
                name: 'mf',
                type: 'widget',
                url: 'mf.webp',
                action: {
                    interact: {}
                },
                title: 'Mini Fridge',
            },
            {
                name: 'clock',
                type: 'widget',
                url: 'clock.webp',
            },
            {

                name: 'closet',
                type: 'widget',
                url: 'closet.webp',
            },
            {
                name: 'furniture_03',
                type: 'widget',
                url: 'furniture_03.webp',
            },
            {
                name: 'furniture_01',
                type: 'widget',
                url: 'furniture_01.webp',
            },
            {
                name: 'd1',
                type: 'widget',
                url: 'd1.webp',
                action: {
                    interact: {}
                },
                title: 'Drawer',
            },
            {
                name: 'd3',
                type: 'widget',
                url: 'd3.webp',
                action: {
                    interact: {}
                },
                title: 'Drawer',
            },
            {
                name: 'd2',
                type: 'widget',
                url: 'd2.webp',
                action: {
                    interact: {}
                },
                title: 'Drawer',
            },
            {
                name: 's1',
                type: 'widget',
                url: 's1.webp',
                action: {
                    interact: {}
                },
                title: 'Shelf',
            },
            {
                name: 'jo',
                type: 'character',
                url: 'jo.webp',
                action: {
                    talk: {},
                    quest: {},
                    flirt: {},
                },
                title: 'Jo',
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
    getObject(name) {
        return this.objects.find(e => e.name == name)
    }
    getUI(name) {
        return this.ui.find(e => e.name == name)
    }
    addObject(scene, x, y, obj, depth) { // add object such as location, widget, character, etc
        let tmp = scene.add.sprite(x, y, obj.name).setInteractive({
            // draggable: obj.draggable
            draggable: false,
            useHandCursor: obj.action ? true : false,
            pixelPerfect: true
        }).setOrigin(0, 0).setDepth(depth).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            console.log([obj.name, dragX, dragY])
        }).on('pointerup', () => {
            if (obj.action) {
                this.hoverDisabled = true
                this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, obj.title)
                this.showActionBtns(obj.action)
                this.setInvestigateMsg(obj.action.investigate ? obj.action.investigate.msg : '')
            } else {
                this.hideTooltip()
            }
        }).on('pointerover', () => {
            if (obj.action && !this.hoverDisabled) {
                this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, obj.title)
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
            this.showInvestigateMsg()
            this.hideActionInfoBar()
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
        this.hideInvestigateMsg()
        this.hoverDisabled = false
    }
    showActionBtns(action) { // such as investigate, interact, 
        console.log(action)
        if (action.investigate) {   
            this.tooltip.list[2].setAlpha(1)
        }

        if (action.interact) {
            this.tooltip.list[7].setAlpha(1)
        }
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
    showInvestigateMsg() {
        this.tooltip.list[5].setAlpha(1)
        this.tooltip.list[6].setAlpha(1)
    }
    hideInvestigateMsg() {
        this.tooltip.list[5].setAlpha(0)
        this.tooltip.list[6].setAlpha(0)
    }
    setInvestigateMsg(msg) {
        this.tooltip.list[6].setText(msg)
        this.hideInvestigateMsg()
    }
}