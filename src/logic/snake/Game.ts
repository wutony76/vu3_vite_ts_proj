import Control from '@/logic/snake/Control'
import Snake from '@/logic/snake/Snake'
import Food from '@/logic/snake/Food'
import {EVENTS} from '@/logic/snake/Parameter'

export default class Game {
  snake:Snake
  food:Food
  control:Control
  direction:string|null = null
  distance:number = 10
  isLive: boolean 

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
    this.logPrint('def-direction = ' + this.direction)

    this.snake.init(this.distance)
    this.control.init()
    this.run()
  }

  run () {
    this.logPrint('run')
    if (!this.isLive) return

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
