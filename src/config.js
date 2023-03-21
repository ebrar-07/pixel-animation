import Game from "./game.js"

const config = {
  "keys": {
    "KeyW": function() { Game.player.move("up")},
    "KeyA": function() { Game.player.move("left")},
    "KeyS": function() { Game.player.move("down")},
    "KeyD": function() { Game.player.move("right")},
    "ArrowUp": function() { Game.player2.move("up")},
    "ArrowLeft": function() { Game.player2.move("left")},
    "ArrowDown": function() { Game.player2.move("down")},
    "ArrowRight": function() { Game.player2.move("right")},
  }
}

export default config;