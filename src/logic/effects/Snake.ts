/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import Location from '@/logic/effects/Location'

export default class Snake {
  snake: HTMLElement  
  head: HTMLElement
  bodies: HTMLCollection
  distance = 10 // number

  constructor ( idName: string) {
    this.snake = document.getElementById(idName)!
    this.head = document.querySelector('#' + idName + ' > div') as HTMLElement
    this.bodies = this.snake.getElementsByTagName('div')
    // console.log('this.bodies.length ', this.bodies.length)
  }
  init (pos = 'top') {
    switch (pos) {
      case 'top':
        this.setBody(0, 80, 0)
        this.setBody(1, 70, 0)
        this.setBody(2, 60, 0)
        this.setBody(3, 50, 0)
        this.setBody(4, 40, 0)
        this.setBody(5, 30, 0)
        this.setBody(6, 20, 0)
        this.setBody(7, 10, 0)
        this.setBody(8, 0, 0)
        break
      case 'bottom':
        this.setBody(0, 340, 490)
        this.setBody(1, 350, 490)
        this.setBody(2, 360, 490)
        this.setBody(3, 370, 490)
        this.setBody(4, 380, 490)
        this.setBody(5, 390, 490)
        this.setBody(6, 400, 490)
        this.setBody(7, 410, 490)
        this.setBody(8, 420, 490)
        break
    }
  }

  get x():number {
    return this.head.offsetLeft
  }
  get y():number {
    return this.head.offsetTop
  }
  set x(val) {
    this.moveBody()
    this.head.style.left = val + 'px'
  }
  set y(val) {
    this.moveBody()
    this.head.style.top = val + 'px'
  }

  setBody(i:number, x:number, y:number) {
    const bodyElement:HTMLElement = this.bodies[i] as HTMLElement 
    bodyElement.style.left = x + 'px' 
    bodyElement.style.top = y + 'px' 
    bodyElement.style.opacity = 1 - (i * 0.1) + '' 
  }

  moveBody() {
    for (let i = 0; i < this.bodies.length; i++) {
      const bodyElement:HTMLElement = this.bodies[i] as HTMLElement 

      const valX = bodyElement.offsetLeft
      const valY = bodyElement.offsetTop
      const location = new Location(valX, valY, this.distance).runRight()

      bodyElement.style.left = location[0] + 'px' 
      bodyElement.style.top = location[1] + 'px' 
      bodyElement.style.opacity = 1 - (i * 0.1) + '' 
    }

    // for (let i = this.bodies.length - 1; i > 0; i--) {
    // // for (let i = 0; i < this.bodies.length-1; i++) {
    //   // let bodyElementFont:HTMLElement 
    //   // if (i <= 0) bodyElementFont = this.head as HTMLElement
    //   // else bodyElementFont = this.bodies[i-1] as HTMLElement 
    //   const bodyElementFont:HTMLElement = this.bodies[i-1] as HTMLElement 
    //   const bodyElement:HTMLElement = this.bodies[i] as HTMLElement 
    //   console.log('i', i)
    //   console.log('bodyElementFont ', bodyElementFont)
    //   const fontBodyX:number = bodyElementFont.offsetLeft
    //   const fontBodyY:number = bodyElementFont.offsetTop

    //   console.log('offsetLeft', bodyElementFont.offsetLeft)
    //   console.log('offsetTop', bodyElementFont.offsetTop)

    //   bodyElement.style.left = fontBodyX + 'px' 
    //   bodyElement.style.top = fontBodyY + 'px' 
    //   bodyElement.style.opacity = 1 - (i * 0.1) + '' 
    // }
  }
}