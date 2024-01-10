import Control from '@/logic/snake/Control'
import Snake from '@/logic/snake/Snake'
import Food from '@/logic/snake/Food'
import {EVENTS, GAMESTATUS} from '@/logic/snake/Parameter'
import { ACTIONS } from '@/logic/util/Parameter'

export default class Game {
  snake:Snake
  food:Food
  control:Control
  direction:string|null = null
  distance = 10 // number
  isLive: boolean
  callback: any // 遊戲結束.callback
  status: string = GAMESTATUS.NONE
  state: any // 外部參數

  constructor (state: any) {
    this.food = new Food()
    this.snake = new Snake(this)
    this.control = new Control(this)
    this.isLive = false
    this.state = state 
    this.init()
  }

  logPrint (msg:any) {
    console.log('Snake-Game ', msg)
  }
  init () {
    this.isLive = true
    this.direction = EVENTS.RIGHT
    this.status = GAMESTATUS.READY 
    this.logPrint('def-direction = ' + this.direction)

    this.snake.init(this.distance)
    this.state.score = 0
    this.state.level = 1 
    this.state.controlStatus = this.returnkeybordKeyToDirection(this.direction) 

    this.control.init()
    this.status = GAMESTATUS.READY 

    setTimeout(() => {
      this.status = GAMESTATUS.PLAYING 
      this.run()
    })
  }
  setCallback (cb: any) {
    if (cb) this.callback = cb
  }
  // 外部.CLICK 控制項
  updateControlEvent (controlStatus: string) {
    switch (controlStatus) {
      case ACTIONS.CONTROLSUP:
        this.direction = EVENTS.UP 
        break
      case ACTIONS.CONTROLSDOWN:
        this.direction = EVENTS.DOWN 
        break
      case ACTIONS.CONTROLSLEFT:
        this.direction = EVENTS.LEFT 
        break
      case ACTIONS.CONTROLSRIGHT:
        this.direction = EVENTS.RIGHT 
        break
    }
    this.control.event = null // keyboard val = null
  }
  updateStatus (changeStatus: string) {
    this.status = changeStatus 
  }

  run () {
    this.logPrint('run, ' + this.status + ', ' + this.returnTimeout())
    if (!this.isLive) return
    if (this.status !== GAMESTATUS.PLAYING) return

    // snake位置更新 
    let x = this.snake.x
    let y = this.snake.y
    switch (this.direction) {
      case EVENTS.UP:
        y -= this.distance 
        break
      case EVENTS.DOWN:
        y += this.distance 
        break
      case EVENTS.LEFT:
        x -= this.distance 
        break
      case EVENTS.RIGHT:
        x += this.distance 
        break
    }
    this.checkEat(x, y)

    // KEYBOARD方向
    const clickKey = this.control.event
    if (clickKey !== null) this.direction = clickKey 
    // 刷新外部CONTROL資訊
    this.state.controlStatus = this.returnkeybordKeyToDirection(this.direction)
    // console.log('direction = ', this.direction)

    // 計算SCORE
    this.state.score = this.calcScore(this.snake.bodies.length - 1)
    this.state.level = this.calcLevel(this.snake.bodies.length - 1)

    // 重新指定snake的位置 
    try {
      this.snake.x = x
      this.snake.y = y
    } catch(e:any) {
      console.log(e.message)
      this.isLive = false
      if (this.callback) this.callback()
    }
    this.isLive && this.status === GAMESTATUS.PLAYING && setTimeout(this.run.bind(this), this.returnTimeout())
  }

  // 
  checkEat(x:number, y:number) {
    if (x === this.food.x && y === this.food.y) {
      this.snake.addBody()
      this.food.change()
    }
  }
  calcScore (processData: number) {
    const delta = processData - 20 
    let newScore = 0
    if (delta > 0) newScore = 20 + delta * 3 
    else newScore = processData 
    return newScore 
  }
  calcLevel (processData: number) {
    let newLevel = 1 
    if (processData >= 90 ) newLevel = 6 
    else if (processData >= 50 ) newLevel = 5
    else if (processData >= 30 ) newLevel = 4 
    else if (processData >= 15 ) newLevel = 3 
    else if (processData >= 5 ) newLevel = 2
    return newLevel 
  }
  returnTimeout () {
    const defTimeout = 1000
    let timeOut = defTimeout

    switch (this.state.level) {
      case 2:
        timeOut = 900
        break
      case 3:
        timeOut = 800
        break
      case 4:
        timeOut = 700
        break
      case 5:
        timeOut = 600
        break
      case 6:
        timeOut = 500
        break
      default:
        timeOut = defTimeout
        break
    }
    return timeOut
  }
  returnkeybordKeyToDirection (keybordKey:string|null) {
    let direction = '' 
    switch(keybordKey) {
      case EVENTS.UP:
        direction = ACTIONS.CONTROLSUP
        break
      case EVENTS.DOWN:
        direction = ACTIONS.CONTROLSDOWN
        break
      case EVENTS.LEFT:
        direction = ACTIONS.CONTROLSLEFT
        break
      case EVENTS.RIGHT:
        direction = ACTIONS.CONTROLSRIGHT
        break
    }
    return direction 
  }
}
