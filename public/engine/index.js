class Engine {
    constructor() {
        this.objects = [
            // locations
            {
                name: 'kitchen',
                type: 'location',
                url: 'home/kitchen/kitchen.webp',
            },
            {
                name: 'school',
                type: 'location',
                url: 'school/entrance/school.webp',
            },
            // gate
            {
                name: 'stairs',
                type: 'gate',
                url: 'home/kitchen/stairs.webp',
                actions: {
                    investigate: {
                        msgs: ["These steps creak so badly.\nThey make midnight-raids on the\nkitchen almost impossible."]
                    },
                    go: {
                        dirName: 'Upstairs'
                    }
                },
                title: 'Stairs',
                mission: []
            },
            {
                name: 'door',
                type: 'gate',
                url: 'home/kitchen/door.webp',
                actions: {
                    investigate: {
                        msgs: ["The door to the outside to the world.\nLet's just say we are not on good\nterms."]
                    },
                    go: {
                        dirName: 'Outside'
                    }
                },
                title: 'Door',
                mission: [
                    {
                        order: 1,
                        condition: [1, 2, 3]
                    }
                ]
            },
            // widgets
            {
                name: 'barstool_1',
                type: 'widget',
                url: 'home/kitchen/barstool_1.webp',
            },
            {
                name: 'counter',
                type: 'widget',
                url: 'home/kitchen/counter.webp',
            },
            {
                name: 'mf',
                type: 'widget',
                url: 'home/kitchen/mf.webp',
                actions: {
                    interact: {
                        msgs: [
                            "This is widget",
                            "Touch it",
                            "And touch it again"
                        ]
                    }
                },
                title: 'Mini Fridge',
            },
            {
                name: 'clock',
                type: 'widget',
                url: 'home/kitchen/clock.webp',
            },
            {

                name: 'closet',
                type: 'widget',
                url: 'home/kitchen/closet.webp',
            },
            {
                name: 'furniture_03',
                type: 'widget',
                url: 'home/kitchen/furniture_03.webp',
            },
            {
                name: 'furniture_01',
                type: 'widget',
                url: 'home/kitchen/furniture_01.webp',
            },
            {
                name: 'd1',
                type: 'widget',
                url: 'home/kitchen/d1.webp',
                actions: {
                    interact: {
                        msgs: [
                            "This is widget",
                            "Touch it",
                            "And touch it again"
                        ]
                    }
                },
                title: 'Drawer',
            },
            {
                name: 'd3',
                type: 'widget',
                url: 'home/kitchen/d3.webp',
                actions: {
                    interact: {
                        msgs: [
                            "This is widget",
                            "Touch it",
                            "And touch it again"
                        ]
                    }
                },
                title: 'Drawer',
            },
            {
                name: 'd2',
                type: 'widget',
                url: 'home/kitchen/d2.webp',
                actions: {
                    interact: {
                        msgs: [
                            "This is widget",
                            "Touch it",
                            "And touch it again"
                        ]
                    }
                },
                title: 'Drawer',
            },
            {
                name: 's1',
                type: 'widget',
                url: 'home/kitchen/s1.webp',
                actions: {
                    interact: {
                        msgs: [
                            "This is widget",
                            "Touch it",
                            "And touch it again"
                        ]
                    }
                },
                title: 'Shelf',
            },
            // character
            {
                name: 'jo',
                type: 'character',
                url: 'home/kitchen/jo.webp',
                actions: {
                    talk: [
                        {
                            order: 1,
                            msgs: [
                                "Good morning! I hope you're ready for the new school year."
                            ]
                        }
                    ],
                    quest: [
                        {
                            order: 1,
                            msgs: [
                                "Whoa... even [jo] looks different. Younger, happier, and less\nresentful toward me.",
                                "What's wrong? You look like you've seen a ghost!"
                            ]
                        }
                    ],
                    flirt: [],
                },
                title: 'Jo',
            },
        ]

        this.ui = [
            {
                name: 'lock_bg',
                url: 'lock_bg.png',
                depth: 100,
            },
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
            },
            {
                name: 'talk',
                url: 'talk.webp',
                depth: 10,
            },
            {
                name: 'quest',
                url: 'quest.webp',
                depth: 10,
            },
            {
                name: 'flirt',
                url: 'flirt.webp',
                depth: 10,
            },
            {
                name: 'go',
                url: 'go.webp',
                depth: 10,
            }
        ]

        this.tooltip = undefined
        this.hoverDisabled = false

        this.seletedObj = undefined
        this.explainMode = {
            status: false,
            msgs: [],
            step: 0
        }
    }
    getObject(name) { // get object info by name
        return this.objects.find(e => e.name == name)
    }
    getUI(name) { // get ui
        return this.ui.find(e => e.name == name)
    }
    addObject(scene, pos, obj, depth, dir) { // add object such as location, widget, character, etc
        if (dir != '') obj.actions.go.dir = dir
        console.log(obj)
        scene.load.image(`${obj.name}`, `../engine/assets/location/${obj.url}`)
        scene.load.once('complete', () => {
            let tmp = scene.add.sprite(pos.x, pos.y, obj.name).setInteractive({
                // draggable: obj.draggable
                draggable: false,
                useHandCursor: obj.actions ? true : false,
                pixelPerfect: true
            }).setOrigin(0, 0).setDepth(depth).on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
                console.log([obj.name, dragX, dragY])
            }).on('pointerup', () => {
                if (obj.actions) {
                    this.seletedObj = obj

                    this.hoverDisabled = true
                    this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, obj.title)
                    this.showActionBtns(obj.actions)
                    this.setInvestigateMsg(obj.actions.investigate ? obj.actions.investigate.msgs[0] : '')
                } else {
                    this.hideTooltip()
                }
            }).on('pointerover', () => {
                if (obj.actions && !this.hoverDisabled) {
                    this.showTooltip(tmp.width / 2 + tmp.x, tmp.height / 2 + tmp.y - 100, obj.title)
                }
            }).on('pointerout', () => {
                if (!this.hoverDisabled) {
                    this.hideTooltip()
                }
            })
        })
        scene.load.start()
    }
    init(scene) {
        this.initTooltip(scene);
        this.initStoryExplainBar(scene);
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
            this.showActionInfoBar('Investigate')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 2

        // add actions info bar
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
            this.hideTooltip()
            this.interact(this.seletedObj)
        }).on('pointerover', () => {
            this.showActionInfoBar('Interact')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 7

        // add talk circle button
        this.tooltip.add(scene.add.sprite(-115, -100, this.getUI('talk').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideTooltip()
            this.talk(this.seletedObj)
        }).on('pointerover', () => {
            this.showActionInfoBar('Talk')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 8

        // add quest circle button
        this.tooltip.add(scene.add.sprite(0, -130, this.getUI('quest').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideTooltip()
            this.quest(this.seletedObj)
        }).on('pointerover', () => {
            this.showActionInfoBar('Quest')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 9

        // add flirt circle button
        this.tooltip.add(scene.add.sprite(115, -100, this.getUI('flirt').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideActionBtns()
        }).on('pointerover', () => {
            this.showActionInfoBar('Flirt')
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 10

        // add go circle button
        this.tooltip.add(scene.add.sprite(115, -100, this.getUI('go').name).setAlpha(0).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        }).on('pointerup', () => {
            this.hideTooltip()
            if (this.checkCondition(this.seletedObj.mission.find(e => e.order == gameMission.order).condition)) {
                if (this.seletedObj.actions.go.dir != '') scene.scene.start(this.seletedObj.actions.go.dir)
            }
        }).on('pointerover', () => {
            if (this.seletedObj.type == 'gate') {
                this.showActionInfoBar(this.seletedObj.actions.go.dirName)
            }
        }).on('pointerout', () => {
            this.hideActionInfoBar()
        })) // index: 11
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
    initStoryExplainBar(scene) {
        this.explainMode.status = false
        this.storyExplainContainer = scene.add.container(0, 0).setDepth(10).setAlpha(0)
        this.storyExplainContainer.add(scene.add.sprite(0, 0, this.getUI('lock_bg').name).setOrigin(0).setInteractive({
            pixelPerfect: false
        }).on('pointerup', () => {
            this.explainMode.step++;
            if (this.explainMode.step >= this.explainMode.msgs.length) {
                this.hideStoryExplainBar()
            } else {
                this.storyExplainContainer.list[1].setText(this.explainMode.msgs[this.explainMode.step])
            }
        }).on('pointerover', () => {
        }).on('pointerout', () => {
        }))

        this.storyExplainContainer.add(scene.add.text(scene.sys.game.canvas.width / 2, scene.sys.game.canvas.height - 100, '', { font: "bold 48px Arial", fill: "#000" }).setOrigin(0.5))
    }
    showStoryExplainBar(msgs) {
        this.explainMode.status = true
        this.explainMode.step = 0
        this.explainMode.msgs = msgs

        this.storyExplainContainer.setAlpha(1)
        this.storyExplainContainer.list[1].setText(this.explainMode.msgs[this.explainMode.step])
    }
    hideStoryExplainBar() {
        this.explainMode.status = false
        this.storyExplainContainer.setAlpha(0)
    }
    showActionBtns(actions) { // such as investigate, interact,
        const len = Object.keys(actions).length

        const idx = {
            investigate: 2,
            interact: 7,
            talk: 8,
            quest: 9,
            flirt: 10,
            go: 11,
        }

        const pos = {
            1: [[0, -100]],
            2: [[-60, -100], [60, -100]],
            3: [[-110, -100], [0, -130], [110, -100]]
        }

        this.hideActionBtns()

        for (const [i, val] of Object.keys(actions).entries()) {
            this.tooltip.list[idx[val]].setAlpha(1)
            this.tooltip.list[idx[val]].setPosition(pos[len][i][0], pos[len][i][1])
        }
    }
    hideActionBtns() {
        this.tooltip.list[2].setAlpha(0) // investigate circle button
        this.tooltip.list[7].setAlpha(0) // interact circle button
        this.tooltip.list[8].setAlpha(0) // talk circle button
        this.tooltip.list[9].setAlpha(0) // quest circle button
        this.tooltip.list[10].setAlpha(0) // flirt circle button
        this.tooltip.list[11].setAlpha(0) // go circle button
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
    checkCondition(conditions) {
        let res = true
        for (const id of conditions) {
            let mission = gameMission.getMission(id)
            if (!mission.complete) {
                res = mission.complete
                this.showStoryExplainBar([mission.err])
                break;
            }
        }

        return res
    }
    talk(to) {
        let msgs = to.actions.talk.find(e => e.order == gameMission.order).msgs

        this.showStoryExplainBar(msgs)

        let mission = gameMission.missions.find(e => e.order == gameMission.order && e.action == 'talk' && e.to == to.name)
        mission.complete = true
    }
    quest(to) {
        let msgs = to.actions.quest.find(e => e.order == gameMission.order).msgs

        this.showStoryExplainBar(msgs)

        let mission = gameMission.missions.find(e => e.order == gameMission.order && e.action == 'quest' && e.to == to.name)
        mission.complete = true
    }
    interact(to) {
        let mission = gameMission.missions.find(e => e.order == gameMission.order && e.action == 'interact' && e.to == to.name)
        if (mission) {
            mission.complete = true
        }

        this.showStoryExplainBar(to.actions.interact ? to.actions.interact.msgs : '')
    }
}