import Control from '@/logic/racing/Control'
// import Snake from '@/logic/snake/Snake'
// import Food from '@/logic/snake/Food'
import {EVENTS, GAMESTATUS} from '@/logic/snake/Parameter'
// import { ACTIONS } from '@/logic/util/Parameter'

export default class Game {
  // snake:Snake
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
    // this.snake = new Snake(this)
    this.control = new Control(this)
    this.isLive = false
    this.state = state 
    this.init()
  }

  init () {
    console.log('init.raceing')
  }

}
