import {CARSTATUS} from '@/logic/racing/Parameter'
export default class Car {
  car: HTMLCollection
  status: string
  parentGame: any

  constructor (game: any) {
    this.parentGame = game
    this.car = document.getElementById('car')!.getElementsByTagName('div')
    this.status = CARSTATUS.NONE
    
    this.init()
  }

  init () {
    console.log('INIT.', this.car.getBoundingClientRect())
  }
  
}