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
  status: string = GAMESTATUS.NONE
  // score = 0
  // level = 1
  state: any

  constructor (state: any) {
    this.food = new Food()
    this.snake = new Snake()
    this.control = new Control()
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
  updateStatus (changeStatus: string) {
    this.status = changeStatus 
  }

  run () {
    this.logPrint('run, ' + this.status)
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

    // 方向
    const clickKey = this.control.event
    if (clickKey !== null) this.direction = clickKey 
    console.log('direction = ', this.direction)

    // 計算
    this.state.score = this.clacScore(this.snake.bodies.length - 1)
    console.log('score', this.state.score)


    // 重新指定snake的位置 
    try {
      this.snake.x = x
      this.snake.y = y
    } catch(e:any) {
      console.log(e.message)
      this.isLive = false
      if (this.callback) this.callback()
    }
    this.isLive && this.status === GAMESTATUS.PLAYING && setTimeout(this.run.bind(this), 1000)
  }
  checkEat(x:number, y:number) {
    if (x === this.food.x && y === this.food.y) {
      this.snake.addBody()
      this.food.change()
    }
  }
  clacScore (processData: number) {
    const delta = processData - 20 
    let newScore = 0
    if (delta > 0) newScore = (processData - 20) + delta * 3 
    else newScore = processData 
    return newScore 
  }
}
