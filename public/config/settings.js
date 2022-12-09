var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 1920,
    height: 1080,
    loader: {
        crossOrigin: 'anonymous'
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            // debugShowBody: true
        }
    },
    parent: 'phaser',
    dom: {
        createContainer: true
    },
    scene: [
        KitchenScene,
        EntranceScene
    ]
};

var game = new Phaser.Game(config);
game.scene.start("KitchenScene");