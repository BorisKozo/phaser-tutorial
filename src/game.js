(function () {

  var Level = function () {

    var player;
    this.preload = function () {
      game.load.image('player_ship', 'assets/sprites/player.png');
    };
    this.create = function () {
      player = game.add.sprite(50, 10, 'player_ship');
    };

    this.update = function () {

    };
    this.render = function () {

    };
  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ship-shooting-forward', new Level());

})();