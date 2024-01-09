import {EVENTS} from '@/logic/snake/Parameter'

export default class Snake {
  // head: HTMLElement
  // body: HTMLAllCollection
  snake: HTMLElement  
  head: HTMLElement
  bodies:HTMLCollection
  distance: number
  parentGame: any

  constructor (game:any) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.parentGame = game
    this.snake = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.snake.getElementsByTagName('div')
    this.distance = -1

    // console.log('this.snake', this.snake)
    // console.log('this.head', this.head, this.head.offsetLeft, this.head.offsetTop)
    // console.log('this.head.x', this.x)
    // console.log('this.head.y', this.y)
  }
  init (dis:number) {
    this.distance = dis

    this.x = 0
    this.y = 0
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const bodyElement:HTMLElement = this.bodies[i] as HTMLElement 
      this.snake.removeChild(bodyElement)
    }
  }

  get x():number {
    return this.head.offsetLeft
  }
  get y():number {
    return this.head.offsetTop
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set x(val) {
    if(this.x === val) return
    if(val < 0 || val > 290) {
      //  throw new Error('蛇撞墙了!')
      if (val > 290) val = 0
      if (val < 0) val = 290
    }
    //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    // console.log(this.parentGame)
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      if(val > this.x) {
        val = this.x - this.distance;
        this.parentGame.control.event = null
        this.parentGame.direction = EVENTS.LEFT
      } else {
        val = this.x + this.distance;
        this.parentGame.control.event = null
        this.parentGame.direction = EVENTS.RIGHT
      }
    }
    this.moveBody()
    this.head.style.left = val + 'px'
    this.checkSelfBody() // 检查有没有撞到自己
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set y(val) {
    if(this.y === val) return
    if(val < 0 || val > 290) {
      if (val > 290) val = 0
      if (val < 0) val = 290
      //  throw new Error('蛇撞墙了!')
    }

    //修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      if(val > this.y) {
        val = this.y - this.distance
        this.parentGame.control.event = null
        this.parentGame.direction = EVENTS.UP
      } else {
        val = this.y + this.distance
        this.parentGame.control.event = null
        this.parentGame.direction = EVENTS.DOWN
      }
    }
    this.moveBody()
    this.head.style.top = val + 'px'
    this.checkSelfBody() // 检查有没有撞到自己
  }

  // 'beforebegin'：元素自身的前面。
  // 'afterbegin'：插入元素内部的第一个子节点之前。
  // 'beforeend'：插入元素内部的最后一个子节点之后。
  // 'afterend'：元素自身的后面。
  addBody() {
    this.snake.insertAdjacentHTML("beforeend", "<div></div>")
  }
  moveBody() {
    /*
      *   将后边的身体设置为前边身体的位置
      *       举例子：
      *           第4节 = 第3节的位置
      *           第3节 = 第2节的位置
      *           第2节 = 蛇头的位置
      * */
    //遍历获取所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const bodyElementFont:HTMLElement = this.bodies[i-1] as HTMLElement 
      const bodyElement:HTMLElement = this.bodies[i] as HTMLElement 
      const fontBodyX:number = bodyElementFont.offsetLeft
      const fontBodyY:number = bodyElementFont.offsetTop
      bodyElement.style.left = fontBodyX + 'px' 
      bodyElement.style.top = fontBodyY + 'px' 
    }
  }
  checkSelfBody() {
    //获取所有的身体，检查其是否和蛇头的坐标发生重叠
    for(let i = 1; i < this.bodies.length; i++) {
      const bodyNd = this.bodies[i] as HTMLElement
      if(this.x === bodyNd.offsetLeft && this.y === bodyNd.offsetTop) {
          //进入判断说明蛇头撞到了身体，游戏结束
          throw new Error('撞到自己了！')
      }
      // console.log(this.x);
    }
  }
}