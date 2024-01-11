import Snake from '@/logic/effects/Snake'

export default class SnakeEffects {
  snake: Snake
  snake2: Snake

  constructor () {
    this.snake = new Snake('snakeEffects')
    this.snake2 = new Snake('snakeEffects2')
    this.init()
  }
  init () {
    this.snake.init('top')
    this.snake2.init('bottom')
    this.run()
  }
  run () {
    this.snake.moveBody()
    this.snake2.moveBody()
    // RUN.END
    setTimeout(this.run.bind(this), 450)
  }
}