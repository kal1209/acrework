let curScene
let sceneId
let situation = []

var EditSceneScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EditSceneScene" });
    },
    init: function () { },
    preload: function () {
        for (const elem of items) {
            this.load.image(`${elem.name}`, `../assets/images/${elem.type}/${elem.url}`)
        }
    },
    create: async function () {
        curScene = this

        this.item_board = this.add.dom(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'div', `background-color: white; width: ${this.sys.game.canvas.width / 3}px; height: 200px; padding: 10px`, '').setOrigin(0.5, 1);

        $('div div').addClass('item_board')
        $('.item_board').append(`<ul class="nav nav-pills" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#location">Location</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#widget">Widget</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="location" class="container tab-pane active">
                    <div style="overflow-y: scroll; height: 80px;"></div>
                </div>
                <div id="widget" class="container tab-pane fade"><br>
                    <div style="overflow-y: scroll; height: 80px;"></div>
                </div>
            </div><button type="button" class="btn btn-primary btn-save">Save</button>`)

        for (const elem of items) {
            $(`div#${elem.type} div`).append(`<img src="../assets/images/${elem.type}/${elem.url}" style="width: 100px; padding: 5px; cursor: pointer;" ondblclick="addItem('${elem.name}', '${elem.type}')">`)
        }
    },
    addItem: function (name, type) {
        let tmpSprite = this.add.sprite(100, 100, name).setInteractive({
            draggable: true,
            useHandCursor: true,
            pixelPerfect: true
        }).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);

            situation.find(e => e.id == this.id).x = dragX
            situation.find(e => e.id == this.id).y = dragY
        });

        tmpSprite.id = Math.random().toString(36).slice(-9)
        tmpSprite.setDepth(depthList[type])

        situation.push({
            id: tmpSprite.id,
            name: name,
            type: type,
            depth: tmpSprite._depth,
            x: tmpSprite.x,
            y: tmpSprite.y
        })

        console.log(situation)
    },
});

function addItem(name, type) {
    curScene.addItem(name, type)
}