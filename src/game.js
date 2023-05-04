import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"
import EventHandler from "./event_handler.js"


/**
 * Diese Klasse enthält die globalen Variablen für das Spiel,
 * sowie das GameLoop, welches das Spiel zeichnen soll.
 */
export default class Game {

  static map = null;
  static player = null;
  static player2 = null;
  static running = false;
  static currentFrame = 0;
  static countdownID = null; //countdown


  constructor() {
    this.tileSize = 16
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 40 * this.tileSize
    this.canvas.height = 10 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    new EventHandler()

    Game.loadMap("maps/map-03.txt")

    this.camera = new Camera(this)

    Game.running = false
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  /**
   * Startet das Spiel.
   * 
   * Das Spiel wird gestartet indem die Animationsschleife
   * des Spiels aufgerufen wird.
   */
  static start() {
    Game.running = true
    setInterval(Game.countdown, 1000)
    

  }

  /**
   * Pausiert das Spiel.
   * 
   * Die Animationsschleife des Spiels wird unterbrochen,
   * dadurch wird das Spiel pausiert.
   * 
   * Um das Spiel weiterlaufen zu lassen, muss die Methode 
   * `start()` aufgerufen werden.
   */
  static pause() {
    Game.running = false
  }

  static loadMap(mapfile) {
      TileRegistry.clear()
      CollisionDetector.clear()
      Game.player = null
      Game.map = new Map(mapfile)

      if (Game.map.mapfile ==="maps/map-02.txt") {
        Game.countdownID = setInterval(Game.countdown, 1 * 1000)
      } //countdown
  }

  static updateMushroom(value) {
    const elem = document.querySelector("#mushroom-counter")
    let count = parseInt (elem.textContent)
    elem.textContent = count + value
  }

  static countdown() {
    const elem = document.querySelector("#count-down")
    let count = parseInt(elem.textContent)
    if (count <= 0) {
      elem.textContent = 30
      Game.loadMap("maps/map-02.txt")
    }else {
        elem.textContent = count - 1
      
    } 
  }
  static setMushroomCounter(value) {
    const elem = document.querySelector("#mushroom-counter")
    elem.textContent = value
  }

  static gameOver() {
    alert("GAME OVER")
    Game.loadMap("maps/map-01.txt")
    Game.setMushroomCounter(0)
    clearInterval(Game.countdownID) // stoppt countdown
  }

  static countdown() {
    const countdownelement = document.querySelector("#countdown")
    let count = parseInt(countdownelement.textContent)
    count--
    if (count < 0) {
      Game.gameOver()
    } else {
      countdownelement.textContent = count
    }
  } //countdown


  /**
   * Berechnet jeweils das nächste Frame für das Spiel.
   * Die Positionen der Spiel-Objekte werden neu berechnet,
   * die Kamera wird korrekt ausgerichtet und die 
   * Spiel-Objekte werden neu gezeichnet.
   */
  gameLoop() {

    Game.currentFrame++
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    EventHandler.handleAllEvents()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision("all")

    this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)

    if (Game.running === true) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}