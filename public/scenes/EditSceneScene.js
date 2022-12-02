let curScene
let sceneId
let projectId
let situation = []

let engine = new Engine();

var EditSceneScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EditSceneScene" });
    },
    init: function () { },
    preload: function () {
        for (const elem of engine.items) {
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

        for (const elem of engine.items) {
            $(`div#${elem.type} div`).append(`<img src="../assets/images/${elem.type}/${elem.url}" style="width: 100px; padding: 5px; cursor: pointer;" ondblclick="addItem(Math.random().toString(36).slice(-9), '${elem.name}', '${elem.type}', 100, 100), '${elem.depth}'">`)
        }

        this.loadScene()
    },
    loadScene: function () { // load the current scene situation
        $.ajax({
            url: "load_scene",
            type: "POST",
            dataType: 'json',
            data: {
                project_id: projectId,
                scene_id: sceneId,
            },
            success: async function (res) {
                if (res.success) {
                    for (const elem of res.situation) {
                        addItem(elem.id, elem.name, elem.type, elem.x, elem.y, elem.depth)
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error');
            }
        });
    },
    addItem: function (id, name, type, x, y, depth) { // add items into scene
        let tmpSprite = this.add.sprite(x, y, name).setInteractive({
            draggable: true,
            useHandCursor: true,
            pixelPerfect: true
        }).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);

            situation.find(e => e.id == this.id).x = dragX
            situation.find(e => e.id == this.id).y = dragY
        });

        tmpSprite.id = id
        tmpSprite.setDepth(depth)

        situation.push({
            id: tmpSprite.id,
            name: name,
            type: type,
            depth: tmpSprite._depth,
            x: tmpSprite.x,
            y: tmpSprite.y
        })
    },
});

function addItem(id, name, type, x, y, depth) {
    curScene.addItem(id, name, type, x, y, depth)
}