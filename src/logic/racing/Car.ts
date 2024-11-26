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
  }
  /**
   * // 初始位置 設定
   * @param x 
   * @param y 
   */
  init ( x = 140, y = 170) {
    console.log('INIT.CAR.get.', this.car, this.car.style)
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
    if(val <= 0 || val >= 270) {
      if (val <= 0) val = 0
      if (val >= 270) val = 270
    }
    this.car.style.left= `${val}px`
  }
  set y(val) {
    if(val <= 0 || val >= 280) {
      if (val <= 0) val = 0
      if (val >= 280) val = 280
    }
    this.car.style.top= `${val}px`
  }
}