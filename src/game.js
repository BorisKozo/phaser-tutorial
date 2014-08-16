(function () {

  var Level = function () {

    var player;
    var cursors;

    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
    };
    this.create = function () {
      player = game.add.sprite(50, 10, 'player_ship');
      cursors = game.input.keyboard.createCursorKeys();
    };

    this.update = function () {
      var delta = 3 * (game.time.elapsed / 16);
      
      if (cursors.up.isDown) {
        player.y = Phaser.Math.clampBottom(player.y - delta,0);
      };
      if (cursors.down.isDown) {
        player.y = Phaser.Math.clamp(player.y + delta, 0, game.camera.height - player.height);
      }
    }

    this.render = function () {

    };
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward', new Level());

})();