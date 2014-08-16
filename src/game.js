(function () {

  var Level = function () {

    var player;
    var cursors;
    var clouds, cloudsForeground;
    var enemies;

    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
      game.load.image('enemy_ship', 'assets/sprites/enemy.png');
      game.load.image('clouds', 'assets/backgrounds/clouds.png');
      game.load.image('clouds_foreground', 'assets/backgrounds/clouds_foreground.png');
    };

    this.create = function () {
      clouds = game.add.tileSprite(0, 0, 1600, 600, 'clouds');

      player = game.add.sprite(50, 250, 'player_ship');
      cursors = game.input.keyboard.createCursorKeys();
      enemies = game.add.group();

      cloudsForeground = game.add.tileSprite(0, 0, 1000, 600, 'clouds_foreground');
    };

    this.update = function () {
      var deltaTime = (game.time.elapsed / 16);
      var deltaPlayerMovement = 3 * deltaTime;
      var deltaCloudsMovement = 1 * deltaTime;
      var enemyMovement = 0.5 * deltaTime;

      if (cursors.up.isDown) {
        player.y = Phaser.Math.clampBottom(player.y - deltaPlayerMovement, 100);
      };
      if (cursors.down.isDown) {
        player.y = Phaser.Math.clamp(player.y + deltaPlayerMovement, 0, game.camera.height - player.height);
      }

      clouds.tilePosition.x -= deltaCloudsMovement;
      cloudsForeground.tilePosition.x -= deltaCloudsMovement * 2;

      if (game.rnd.integerInRange(0, 250) === 0) {
        enemies.create(game.camera.width + 10, game.rnd.integerInRange(100, 500), 'enemy_ship');
      }

      enemies.forEach(function (enemy) {
        enemy.x -= enemyMovement;
      });
    }

    this.render = function () {

    };
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward', new Level());

})();