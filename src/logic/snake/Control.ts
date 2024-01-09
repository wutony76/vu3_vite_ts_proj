import {EVENTS} from '@/logic/snake/Parameter'

export default class Control {
  clickEvent: string|null

  constructor () {
    this.clickEvent = null
  }

  init () {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
  }

  keydownHandler(event:KeyboardEvent) {
    console.log('keybord >> ', event.key)
    switch (event.key) {
      case EVENTS.UP:
      case EVENTS.DOWN:
      case EVENTS.LEFT:
      case EVENTS.RIGHT:
        this.clickEvent = event.key
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