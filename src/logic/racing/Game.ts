import Control from '@/logic/racing/Control'
import Car from '@/logic/racing/Car'
// import Food from '@/logic/snake/Food'
import {EVENTS, GAMESTATUS} from '@/logic/snake/Parameter'
// import { ACTIONS } from '@/logic/util/Parameter'

export default class Game {
  car:Car
  // food:Food
  control:Control
  direction:string|null = null
  distance = 10 // number
  isLive: boolean
  callback: any // 遊戲結束.callback
  status: string = GAMESTATUS.NONE
  state: any // 外部參數

  constructor (state: any) {
    // this.food = new Food()
    this.car = new Car(this)
    this.control = new Control(this)
    this.isLive = false
    this.state = state 
    this.init()
  }

  updateStatus (changeStatus: string) {
    this.status = changeStatus 
  }
  logPrint (msg:any) {
    console.log('Racing-Game ', msg)
  }
  init () {
    console.log('init.raceing')
    this.isLive = true
    this.status = GAMESTATUS.READY 

    this.state.score = 0
    this.state.level = 1

    setTimeout(() => {
      this.status = GAMESTATUS.PLAYING 
      this.run()
    })
  }

  run () {
    this.logPrint(`run, ${this.status}`)
  }

}
