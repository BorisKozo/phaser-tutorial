(function () {

  var Level = function () {

    var player;
    var cursors;
    var clouds, cloudsForeground;
    var enemies,enemy;
    var lasers, laserTime=0, laser;

    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
      game.load.image('enemy_ship', 'assets/sprites/enemy.png');
      game.load.image('laser', 'assets/sprites/laser.png');
      game.load.image('clouds', 'assets/backgrounds/clouds.png');
      game.load.image('clouds_foreground', 'assets/backgrounds/clouds_foreground.png');
    };

    this.create = function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      clouds = game.add.tileSprite(0, 0, 1600, 600, 'clouds');

      player = game.add.sprite(50, 250, 'player_ship');
      cursors = game.input.keyboard.createCursorKeys();
      game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR]);

      enemies = game.add.group();
      enemies.enableBody = true;
      enemies.physicsBodyType = Phaser.Physics.ARCADE;

      lasers = game.add.group();
      lasers.enableBody = true;
      lasers.physicsBodyType = Phaser.Physics.ARCADE;

      cloudsForeground = game.add.tileSprite(0, 0, 1000, 600, 'clouds_foreground');
    };

    this.update = function () {
      var deltaTime = (game.time.elapsed / 16);
      var deltaPlayerMovement = 3 * deltaTime;
      var deltaCloudsMovement = 1 * deltaTime;

      if (cursors.up.isDown) {
        player.y = Phaser.Math.clampBottom(player.y - deltaPlayerMovement, 100);
      };

      if (cursors.down.isDown) {
        player.y = Phaser.Math.clamp(player.y + deltaPlayerMovement, 0, game.camera.height - player.height);
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (game.time.now > laserTime) {
          laser = lasers.create(player.x + player.width, player.y + player.height / 2 - 4, 'laser');
          laser.body.velocity.x = 300;
          laserTime = game.time.now + 1000;
          laser.checkWorldBounds = true;
          laser.outOfBoundsKill = true;
        }
      }

      clouds.tilePosition.x -= deltaCloudsMovement;
      cloudsForeground.tilePosition.x -= deltaCloudsMovement * 2;

      if (game.rnd.integerInRange(0, 100) === 0) {
        enemy = enemies.create(game.camera.width + 10, game.rnd.integerInRange(100, 500), 'enemy_ship');
        enemy.body.velocity.x = -200;
      }

    }

    this.render = function () {

    };
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward', new Level());

})();