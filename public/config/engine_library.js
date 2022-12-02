class Engine {
    constructor() {
        this.depthList = {
            location: 1,
            widget: 2,
        };

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
                draggable: true,
            },
            {
                name: 'd3',
                type: 'widget',
                url: 'd3.webp',
                depth: 2,
                interactable: true,
                draggable: true,
            },
            {
                name: 'd2',
                type: 'widget',
                url: 'd2.webp',
                depth: 2,
                interactable: true,
                draggable: true,
            },
            {
                name: 's1',
                type: 'widget',
                url: 's1.webp',
                depth: 2,
                interactable: true,
                draggable: true,
            },
        ]
    }
    getItem(name) {
        return this.items.find(e => e.name == name)
    }
    addItem(scene, x, y, item) {
        let container = scene.add.container(x, y)
        container.add(scene.add.sprite(0, 0, item.name).setInteractive({
            draggable: item.draggable,
            useHandCursor: item.interactable,
            pixelPerfect: true
        }).setOrigin(0, 0).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            console.log([item.name, dragX, dragY])
        })).setDepth(item.depth)
    }
}