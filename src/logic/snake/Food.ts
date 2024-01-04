export default class Food {
  food: HTMLElement 

  constructor () {
    this.food = document.getElementById('food')!
  }

  get x() {
    return this.food.offsetLeft
  }
  get y() {
    return this.food.offsetTop
  }

  change() {
    const top = Math.round(Math.random()*29)*10
    const left = Math.round(Math.random()*29)*10
    this.food.style.top = top + 'px'
    this.food.style.left = left + 'px'
  }
}