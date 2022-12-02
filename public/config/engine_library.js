class Engine {
    constructor() {
        this.depthList = {
            location: 1,
            widget: 2,
        };

        this.items = [
            {
                name: 'bathroom',
                type: 'location',
                url: 'bathroom.webp',
                depth: this.depthList.location,
            }, {
                name: 'bedroom',
                type: 'location',
                url: 'bedroom.webp',
                depth: this.depthList.location,
            }, {
                name: 'homehall',
                type: 'location',
                url: 'homehall.webp',
                depth: this.depthList.location,
            }, {
                name: 'kitchen',
                type: 'location',
                url: 'kitchen.webp',
                depth: this.depthList.location,
            },
            {
                name: 'clock',
                type: 'widget',
                url: 'clock.webp',
                depth: this.depthList.widget,
            },
            {
                name: 'closet',
                type: 'widget',
                url: 'closet.webp',
                depth: this.depthList.widget,
            },
            {
                name: 'furniture_03',
                type: 'widget',
                url: 'furniture_03.webp',
                depth: this.depthList.widget,
            },
            {
                name: 'furniture_01',
                type: 'widget',
                url: 'furniture_01.webp',
                depth: this.depthList.widget,
            }
        ]
    }
}