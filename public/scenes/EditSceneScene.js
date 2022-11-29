var EditSceneScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EditSceneScene" });
    },
    init: function () { },
    preload: function () {
    },
    create: async function () {
        this.item_board = this.add.dom(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'div', `background-color: white; width: ${this.sys.game.canvas.width / 2}px; height: 200px; padding: 10px`, '').setOrigin(0.5, 1);
    },
});