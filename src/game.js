(function () {

  var Level = function () {

    var player;
    var cursors;
    var clouds, cloudsForeground;

    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
      game.load.image('clouds', 'assets/backgrounds/clouds.png');
      game.load.image('clouds_foreground', 'assets/backgrounds/clouds_foreground.png');
    };
    this.create = function () {
      clouds = game.add.tileSprite(0, 0, 1600, 600, 'clouds');

      player = game.add.sprite(50, 10, 'player_ship');
      cursors = game.input.keyboard.createCursorKeys();

      cloudsForeground = game.add.tileSprite(0, 0, 1000, 600, 'clouds_foreground');
    };

    this.update = function () {
      var deltaTime = (game.time.elapsed / 16);
      var deltaPlayerMovement = 3 * deltaTime;
      var deltaCloudsMovement = 1.8 * deltaTime;
      
      if (cursors.up.isDown) {
        player.y = Phaser.Math.clampBottom(player.y - deltaPlayerMovement,0);
      };
      if (cursors.down.isDown) {
        player.y = Phaser.Math.clamp(player.y + deltaPlayerMovement, 0, game.camera.height - player.height);
      }

      clouds.tilePosition.x -= deltaCloudsMovement;
      cloudsForeground.tilePosition.x -= deltaCloudsMovement / 2;
    }

    this.render = function () {

    };
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward', new Level());

})();