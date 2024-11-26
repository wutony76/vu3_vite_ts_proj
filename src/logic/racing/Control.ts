import {EVENTS} from '@/logic/racing/Parameter'

export default class Control {
  parentGame: any
  clickEvent: string|null

  constructor (game:any) {
    this.parentGame = game
    this.clickEvent = null
  }

  init () {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
  }
  keydownHandler(event:KeyboardEvent) {
    console.log('car.keybord >> ', event.key)
    switch (event.key) {
      case EVENTS.UP:
      case EVENTS.DOWN:
      case EVENTS.LEFT:
      case EVENTS.RIGHT:
        this.clickEvent = event.key
        this.parentGame.direction = this.clickEvent 
        break
    }
  }

  set event(val:string|null) {
    this.clickEvent = val
  }
  get event() {
    return this.clickEvent
  }
}