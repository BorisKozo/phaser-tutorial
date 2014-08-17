(function () {

  var Level = function () {

    var player;
    var cursors;
    var clouds, cloudsForeground;
    var enemies,enemy;
    var lasers, laserTime, laser;
    var scoreText, score;
    var explosions;
    var laserSound, explosionSound;
    var lives, livesText;

    function collisionHandler(laser, enemy) {
      var explosion = explosions.create(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'explosion');
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('explode');
      //name, framerate, loop, killOnComplete
      explosion.animations.play('explode', 60, false, true);
      explosionSound.play();
      laser.kill();
      enemy.kill();
      score++;
      scoreText.setText("Score: " + score);
    }

    this.init = function () {
      laserTime = 0;
      score = 0;
      lives = 5
    };

    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
      game.load.image('enemy_ship', 'assets/sprites/enemy.png');
      game.load.image('laser', 'assets/sprites/laser.png');
      game.load.image('clouds', 'assets/backgrounds/clouds.png');
      game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 256, 256);
      game.load.image('clouds_foreground', 'assets/backgrounds/clouds_foreground.png');

      game.load.audio('explode', 'assets/sounds/explode.ogg');
      game.load.audio('laser', 'assets/sounds/laser.ogg');
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

      explosions = game.add.group();
      cloudsForeground = game.add.tileSprite(0, 0, 1000, 600, 'clouds_foreground');

      scoreText = game.add.text(10, 10, "Score: " + score, {
        font: "38px Arial",
        fill: "#ff0044",
        align: "left"
      });

      livesText = game.add.text(game.camera.width - 10, 10, "Lives: " + lives, {
        font: "38px Arial",
        fill: "#ff0044",
        align: "left"
      });
      livesText.anchor.setTo(1, 0);


      laserSound = game.add.audio('laser');
      explosionSound = game.add.audio('explode');

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
          laserSound.play();
        }
      }

      clouds.tilePosition.x -= deltaCloudsMovement;
      cloudsForeground.tilePosition.x -= deltaCloudsMovement * 2;

      if (game.rnd.integerInRange(0, 100) === 0) {
        enemy = enemies.create(game.camera.width + 10, game.rnd.integerInRange(100, 500), 'enemy_ship');
        enemy.body.velocity.x = -200;
      }

      game.physics.arcade.overlap(lasers, enemies, collisionHandler, null, this);

      enemies.forEachAlive(function (enemy) {
        if (enemy.x <= 0) {
          enemy.kill();
          lives--;
        }
      });

      if (lives <= 0) {
        game.state.start('EndGame', true, false, score);
      }

      livesText.setText("Lives: " + lives);
    }

    this.render = function () {

    };
  }

  var EndGame = function () {
    var endScore = 0;
    this.init = function (score) {
      endScore = score || 0;
    }

    this.create = function () {

     var text = game.add.text(game.world.centerX, game.world.centerY - 70, "Game Over!", {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
      });

     text.anchor.setTo(0.5, 0.5);

     text = game.add.text(game.world.centerX, game.world.centerY, "Score: "+endScore, {
       font: "65px Arial",
       fill: "#ff0044",
       align: "center"
     });

     text.anchor.setTo(0.5, 0.5);

     text = game.add.text(game.world.centerX, game.world.centerY+150, "Press Space to Continue", {
       font: "36px Arial",
       fill: "#ff0044",
       align: "center"
     });

     text.anchor.setTo(0.5, 0.5);

     game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    };

    this.update = function () {
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        game.state.start('Level');
      }
    }
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward');

  game.state.add('Level', new Level());
  game.state.add('EndGame', new EndGame());
  game.state.start('Level');
})();