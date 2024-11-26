import {CARSTATUS} from '@/logic/racing/Parameter'
export default class Car {
  car: HTMLElement
  width: number
  height: number
  status: string
  parentGame: any
  settings: { x: number, y: number, width: number, height:number} 

  constructor (game: any) {
    this.parentGame = game
    this.car = document.getElementById('car')!
    this.settings = this.car.getBoundingClientRect() 
    this.status = CARSTATUS.NONE
    this.width = this.settings.width 
    this.height = this.settings.height 
    // this.init()
  }

  init ( x = 135, y = 170) {
    console.log('INIT.GET.', this.car, this.car.style)
    this.x = x 
    this.y = y 
  }

  get x():number {
    let _x = this.car.style.left
    _x = _x.replace('px', '') 
    return isNaN(+_x) ? 0 :+_x
  }
  get y():number {
    let _y = this.car.style.top
    _y = _y.replace('px', '') 
    return isNaN(+_y) ? 0 :+_y
  }
  set x(val) {
    this.car.style.left= `${val}px`
  }
  set y(val) {
    this.car.style.top= `${val}px`
  }
}