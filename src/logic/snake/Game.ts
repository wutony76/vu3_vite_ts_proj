import Snake from '@/logic/snake/Snake'

export default class Game {
  snake: Snake
  constructor () {
    this.snake = new Snake()
    this.init()
  }

  logPrint (msg: any) {
    console.log('Snake-Game ', msg)
  }

  init () {
    this.logPrint('init')
    this.logPrint(this.snake)

    this.run()
  }
  
  run () {
    this.logPrint('run')
  }
}
