var EditSceneScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "EditSceneScene" });
    },
    init: function () { },
    preload: function () {
    },
    create: async function () {
        this.add.dom(0, this.sys.game.canvas.height, 'div', `background-color: white; width: ${this.sys.game.canvas.width}px; height: 100px; font: 48px Arial`, 'Phaser').setOrigin(0, 1);
    },
});