import Tools from '@/logic/util/Tools' 
export const WALLSTATUS = {
  WALL: 0,
  ROAD: 1,
  // WATER: 'wall_status_water',
  // STONE: 'wall_status_stone',
}

export default class Wall{
  wall: HTMLElement
  parentGame: any
  distance = 10 // number
  startCarX = 14 // 初始Car位置
  startRoadX = -1 // 紀錄ROW位置
  startRoadLen = -1 // 紀錄ROW寬度

  constructor (game:any) {
    this.parentGame = game
    this.wall = document.getElementById('wall')!
  }
  init () {
    console.log('INIT~ wall')
  }
  handleGetPoint(point: any) {
    let _v = point.replace('px', '') 
    return isNaN(+_v) ? 0 :+_v
  }
  async move () {
    console.log('WALL.MOVE.')
    /**
    // WALL移動
    let _y = this.handleGetPoint (this.wall.style.top)
    _y += this.distance
    this.wall.style.top= `${_y}px`
     */
    this.addRowWall()
    this.checkWallRowEnd()
  }
  // CHECK.REOMVE.ROW.
  checkWallRowEnd() {
    let _getArr = this.wall.getElementsByClassName('row')
    if (_getArr.length > 30) {
      let elEnd = _getArr[_getArr.length - 1]
      elEnd.remove()
    }
  }
  // ADD.ROW
  addRowWall() {
    this.wall.insertAdjacentHTML("afterbegin", this._proRow().outerHTML)
  }
  // 產生由STTUS對應的DOME.HTML
  _getGridHtml(status:number) {
    let base = document.createElement("div").outerHTML
    switch(status) {
      case WALLSTATUS.WALL:
        return base 
      case WALLSTATUS.ROAD:
        let dom = document.createElement("div")
        dom.classList.add("r")
        return dom.outerHTML
      default :
        return base 
    }
  }
  // 產生.ROW一列牆壁
  _proRow () {
    let rowNode = document.createElement("div")
    rowNode.classList.add("row")
    let _randomArr=  this._proWallArr()
    _randomArr.forEach((status) => {
      rowNode.insertAdjacentHTML("beforeend", this._getGridHtml(status))
    })
    return rowNode
  }
  // 隨機產生.ROW一列牆壁資料
  _proWallArr () {
    let wallWidth = 2
    let carWidth = 3
    let roadLen = Tools.getRandom(6,10) // 取road寬度
    let startRoadX = this.startCarX // GET紀錄ROW位置
    if (startRoadX < 0) startRoadX = this.startCarX 
    let startRoadLen = this.startRoadLen // GET紀錄ROW位置
    if (startRoadLen < 0) startRoadLen = roadLen
    let endRoadX = startRoadX + startRoadLen 

    // 取road可以的位置
    let canStartPos = -1
    let canEndPos = -1
    // 開始位置 = 上列的位置 -上列長度 - 車寬
    canStartPos = startRoadX - startRoadLen - carWidth
    // 結束位置 = 上列的位置 + 這列長度 
    canEndPos = startRoadX + roadLen 

    // CALC計算位置, 超出限制 
    if (canStartPos < wallWidth) {
      canStartPos = wallWidth 
      canEndPos = canStartPos + roadLen 
      console.log('CALC-1.', `R.st:${canStartPos}, ed:${canEndPos}`)

    } else if (canStartPos > 30 - roadLen - wallWidth) {
      canStartPos = 30 - roadLen - wallWidth 
      canEndPos = canStartPos + roadLen 
      console.log('CALC-2.', `R.st:${canStartPos}, ed:${canEndPos}`)

    } else if (canEndPos > 30 - roadLen - wallWidth) {
      canEndPos = 30 - roadLen - wallWidth
      canStartPos = canEndPos - roadLen 
      console.log('CALC-3.', `R.st:${canStartPos}, ed:${canEndPos}`)

    } else if (canEndPos < wallWidth + roadLen) {
      canEndPos = wallWidth + roadLen 
      canStartPos = canEndPos - roadLen 
      console.log('CALC-4.', `R.st:${canStartPos}, ed:${canEndPos}`)
    }

    console.log('CANGETPOS-1.', `R.st:${canStartPos}, ed:${canEndPos}`)
    let _randomRowPos = Tools.getRandom(canStartPos, canEndPos)
    let _startRoad = _randomRowPos-1 
    let _endRoad = _randomRowPos+roadLen

    console.log('CANGETPOS-2.取.', `pos:${_randomRowPos}, _startRoad:${_startRoad}, roadLen:${roadLen}`)

    // startRoadX
    // endRoadX
    console.log('CANGETPOS-3.', `stI:${startRoadX}, endI:${endRoadX}`)
    console.log('CANGETPOS-4.', `stI:${_startRoad}, endI:${_endRoad}`)
    // -處理ROAD最後位置 
    if (_startRoad > (endRoadX-carWidth)) {
      _startRoad = endRoadX-carWidth 
      _endRoad = _startRoad+roadLen
    } else if (_endRoad < (startRoadX + carWidth)) {
      _endRoad = startRoadX + carWidth
      _startRoad = _endRoad - roadLen 
    } 
    console.log('CANGETPOS-5.', `stI:${_startRoad}, endI:${_endRoad}`)

    this.startCarX = _startRoad 
    this.startRoadLen = roadLen 

    // init
    let _arr = []
    for(let i = 0; i < 30; i++) {
      if (i >= _startRoad && i <= _endRoad) _arr.push(1)
      else _arr.push(0)
    }
    // console.log('_arr', _arr)
    return _arr
  }
}