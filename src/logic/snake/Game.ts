import Control from '@/logic/snake/Control'
import Snake from '@/logic/snake/Snake'
import Food from '@/logic/snake/Food'
import {EVENTS, GAMESTATUS} from '@/logic/snake/Parameter'

export default class Game {
  snake:Snake
  food:Food
  control:Control
  direction:string|null = null
  distance = 10 // number
  isLive: boolean
  callback: any // 遊戲結束.callback
  status:string = GAMESTATUS.NONE 

  constructor () {
    this.food = new Food()
    this.snake = new Snake()
    this.control = new Control()
    this.isLive = false
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
    this.control.init()
    this.status = GAMESTATUS.READY 

    this.status = GAMESTATUS.RUN 
    this.run()
  }

  setCallback (cb: any) {
    if (cb) this.callback = cb 
  }
  updateStatus (changeStatus: string) {
    this.status = changeStatus 
  }

  run () {
    this.logPrint('run, ' + this.status)
    if (!this.isLive) return
    if (this.status !== GAMESTATUS.RUN) return

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

    // 方向
    const clickKey = this.control.event
    if (clickKey !== null) this.direction = clickKey 
    console.log('direction = ', this.direction)

    // 重新指定snake的位置 
    try {
      this.snake.x = x
      this.snake.y = y
    } catch(e:any) {
      console.log(e.message)
      this.isLive = false
      if (this.callback) this.callback()
    }
    this.isLive && setTimeout(this.run.bind(this), 1000)
  }

  checkEat(x:number, y:number) {
    if (x === this.food.x && y === this.food.y) {
      this.snake.addBody()
      this.food.change()
    }
  }
}
