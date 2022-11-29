let curScene

var EditSceneScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EditSceneScene" });
    },
    init: function () { },
    preload: function () {
        for (const elem of locations) {
            this.load.image(`${elem.name}`, `../assets/images/locations/${elem.url}`)
        }
    },
    create: async function () {
        curScene = this

        this.locationBg = this.add.image(0, 0, '').setOrigin(0, 0).setInteractive({
            draggable: true,
            useHandCursor: true,
            pixelPerfect: true
        }).on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
        })

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
                    <div style="overflow-y: scroll; height: 140px"></div>
                </div>
                <div id="widget" class="container tab-pane fade"><br>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>`)

        for (const elem of locations) {
            $('div#location div').append(`<img src="../assets/images/locations/${elem.url}" style="width: 100px; padding: 5px; cursor: pointer;" ondblclick="selLocation('${elem.name}')">`)
        }
    },
    selLocation: function (data) {
        // console.log(data)
        this.locationBg.setTexture(data)
    },
});

function selLocation(data) {
    curScene.selLocation(data)
}