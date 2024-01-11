

export default class Location {
  x:number
  y:number
  distance:number 

  constructor (x:number, y:number, distance:number) {
    this.x = x
    this.y = y 
    this.distance = distance
  }

  set(x:number, y:number) {
    this.x = x
    this.y = y 
  }

  runRight () {
    const x = this.x
    const y = this.y
    if ( x < 420 && y === 0) {
      this.x += this.distance 
    } else if (x === 420 && y < 490) {
      this.y += this.distance 
    } else if ( x > 0 && x <= 420 && y === 490 ) {
      this.x -= this.distance 
    }else if (x === 0 && y > 0 && y <= 490 ) {
      this.y -= this.distance 
    } 
    return [this.x, this.y]
  }
}