export default class Camera {
  constructor(game, offset = { x: 0, y: 0 }) {
    this.game = game
    this.offset = offset
    this.interpolate = {x: 0, y: 0}
    this.framesMoved = 0
  }

  /**
   * Lösche alles was auf dem Canvas ist, damit im nächsten Frame neu gezeichnet werden kann.
   * Diese Funktion muss in jedem Frame aufgerufen werden, sonst kommen Teile aus dem letzten 
   * Frame vor, das kann zu merkwürdigen Effekten führen.
   */
  clearScreen() {
    const transform = this.game.ctx.getTransform()
    this.game.ctx.clearRect(-transform.e, -transform.f, this.game.canvas.width, this.game.canvas.height);
  }

  /** 
   * Zentriere die Kamera auf ein Spielobjekt. Das Objekt wir in die Mitte des Canvas 
   * gesetzt. Damit die Kamera dem Objekt folgt, muss das in jedem Frame aufgerufen werden.
   * @param {GameObject} object Das GameObjekt, worauf die Kamera zentriert werden soll.
   */
  centerObject(object) {
    if (object == null) return
    this.centerCoordinate(object.x, object.y)
  }

  /**
   * Zentriere die Kamera auf eine Koordinate. Diese Koordinate wird in der Mitte des Canvas sein.
   * @param {number} x Die x-Koordinate, die zentriert werden soll. Diese wird in Pixeln angegeben.
   * @param {number} y Die y-Koordinate, die zentriert werden soll. Diese wird in Pixeln angegeben.
   */
  centerCoordinate(x, y) {
    this.game.ctx.setTransform(1, 0, 0, 1,
      (-x + this.offset.x) + this.game.canvas.width/2,
      (-y + this.offset.y) +this.game.canvas.height / 2)
  }

  /**
   * Bewege die Kamera zu einem Punkt über eine Anzahl an Frames. Der angegebene Punkt wird der neue
   * Mittelpunkt vom Canvas sein.
   * @param {number} x Die x-Koordinate, die zentriert werden soll. Diese wird in Pixeln angegeben.
   * @param {number} y Die y-Koordinate, die zentriert werden soll. Diese wird in Pixeln angegeben.
   * @param {number} numberOfFrames Die Anzahl der Frames über die die Kamera aus den neuen Punkt verschoben werden soll.
   */
  moveToPoint(x, y, numerOfFrames) {
    this.framesToMove = numerOfFrames
    this.interpolate = {
      x: x / numerOfFrames,
      y: y / numerOfFrames,
    }
  }

  /**
   * Teilt der Kamera mit dass das nächste Frame gezeichnet wird.
   * Die Methode soll in jedem Durchlauf der Game-Schleife aufgerufen werden, wird aber eigentlich nur
   * benötigt wenn die Kamera bewegt werden soll.
   */
  nextFrame() {
    if ( this.framesToMove === 0) return
    if ( this.interpolate == {x: 0, y: 0}) return
    this.framesMoved++
    if (this.framesMoved >= this.framesToMove) {
      this.framesToMove = 0
      this.interpolate = {x: 0, y: 0}
      this.framesMoved = 0
    }
    this.offset.x += this.interpolate.x
    this.offset.y += this.interpolate.y
  }

  static shiftBackground(value) {
      const canvasStyle = document.querySelector("#canvas").style
      const bgX = parseInt(canvasStyle.backgroundPositionX) || 0
      canvasStyle.backgroundPositionX = `${bgX + value}px`
  }
    
}