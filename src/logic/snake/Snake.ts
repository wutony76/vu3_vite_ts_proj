export default class Snake {
  // head: HTMLElement
  // body: HTMLAllCollection
  snake: HTMLElement  
  constructor () {
    this.snake = document.getElementById('snake')!

    console.log('this.snake', document.getElementById('snake'))
    console.log('this.snake', this.snake)
  }
}