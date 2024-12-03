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

  // startRoadX = -1 // 紀錄ROW位置
  // startRoadLen = -1 // 紀錄ROW寬度
  // 紀錄ROW位置- 需要有足夠的空間讓CAR過 
  recordPos = [
    {startX: this.startCarX, len: 3},
    {startX: this.startCarX, len: 3},
  ]
  wallInfoArr = {} 
  counter = 0

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
  move () {
    console.log(`WALL.MOVE. ${this.counter}`)
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
    let _randomArr=  this._proWallArr()
    let rowNode = document.createElement("div")
    rowNode.classList.add("row")
    rowNode.setAttribute("_id", _randomArr.id.toString())
    _randomArr.arr.forEach((status) => {
      rowNode.insertAdjacentHTML("beforeend", this._getGridHtml(status))
    })
    return rowNode
  }
  // 隨機產生.ROW一列牆壁資料
  _proWallArr () {
    this.counter ++
    const _getIndex = this.counter%2 
    console.log('-MOD.', _getIndex)

    let wallWidth = 2
    let carWidth = 3
    let roadLen = Tools.getRandom(4, 8) // 取road寬度

     // GET紀錄ROW位置.startRoadX
    let startRoadX = this.recordPos[_getIndex].startX
    if (startRoadX < 0) startRoadX = this.startCarX 
     // GET紀錄ROW位置
    let startRoadLen = this.recordPos[_getIndex].len
    if (startRoadLen < 0) {
      if (_getIndex === 1) startRoadLen = roadLen
      else if (_getIndex === 0) startRoadLen = this.recordPos[1].len
    }
    let endRoadX = startRoadX + startRoadLen 
    // 取road可以的位置
    let canStartPos = -1
    let canEndPos = -1

    console.log('CANGETPOS-1. args', `--startRoadX:${startRoadX}, --startRoadLen:${startRoadLen}, --carWidth:${carWidth}` )
    // 開始位置=上列的位置-這列長度+車寬
    canStartPos = startRoadX - roadLen + carWidth
    // 結束位置=上列的位置+上列長度-車寬 
    canEndPos = startRoadX + startRoadLen-carWidth

    console.log('CANGETPOS-1. step1', `--st:${canStartPos}, --ed:${canEndPos}, --len:${roadLen}`, canEndPos-canStartPos)
    // CALC計算位置, 超出限制canStartPos, canEndPos 
    if (canStartPos < wallWidth) {
      canStartPos = wallWidth 
      // console.log('CANGETPOS-1. CALC-1.', `R.st:${canStartPos}, ed:${canEndPos}`)
    } else if (canStartPos > 29 - roadLen - carWidth - wallWidth) {
      canStartPos = 29 - roadLen - carWidth - wallWidth 
      if (canEndPos - canStartPos <= 3) canEndPos = canStartPos + roadLen 
      // console.log('CANGETPOS-1. CALC-2.', `R.st:${canStartPos}, ed:${canEndPos}`)
    } else if (canEndPos + roadLen  > 29 - wallWidth) {
      canEndPos = 29 - roadLen - wallWidth
      if (canEndPos-canStartPos <= 3) canStartPos = canEndPos - roadLen 
      // console.log('CANGETPOS-1. CALC-3.', `R.st:${canStartPos}, ed:${canEndPos}`)
    } else if (canEndPos < wallWidth + roadLen) {
      canEndPos = wallWidth + roadLen 
      if (canEndPos-canStartPos <= 3) canStartPos = canEndPos - roadLen 
      // console.log('CANGETPOS-1. CALC-4.', `R.st:${canStartPos}, ed:${canEndPos}`)
    }
    console.log('CANGETPOS-1.可隨機範圍', `R.len:${roadLen}, st:${canStartPos}, ed:${canEndPos}`)

    let _randomRowPos = Tools.getRandom(canStartPos, canEndPos)
    let _startRoad = _randomRowPos
    let _endRoad = _randomRowPos+roadLen
    console.log('CANGETPOS-2.取隨機位置.', `_st:${_startRoad}, _ed:${_endRoad} -- roadLen: ${roadLen}`)

    // startRoadX, endRoadX
    console.log('CANGETPOS-3.', `stI:${startRoadX}, endI:${endRoadX}`)
    this.recordPos.forEach((_posInfo) => {
      const _gStX = _posInfo.startX
      const _gEdX = _gStX + _posInfo.len 
      // -處理ROAD最後位置 
      if (_startRoad > (_gEdX - carWidth - 1)) {
        _startRoad = _gEdX - carWidth - 1 
        _endRoad = _startRoad + roadLen
      } else if (_endRoad < _gStX + carWidth) {
        _endRoad = _gStX + carWidth
        _startRoad = _endRoad - roadLen
      } 
    })
    // -處理ROAD最後位置 
    // if (_startRoad > (endRoadX - carWidth - 1)) {
    //   _startRoad = endRoadX - carWidth - 1 
    //   _endRoad = _startRoad + roadLen
    // } else if (_endRoad < startRoadX + carWidth) {
    //   _endRoad = startRoadX + carWidth
    //   _startRoad = _endRoad - roadLen
    // } 
    console.log('CANGETPOS-END.可隨機範圍 ------------------------')

    console.log('CANGETPOS-4.', `stI:${_startRoad}, endI:${_endRoad}`)
    this.recordPos[_getIndex].startX = _startRoad 
    this.recordPos[_getIndex].len = roadLen 

    // --INIT
    let _arr = []
    for(let i = 0; i < 30; i++) {
      if (i >= _startRoad && i < _endRoad) _arr.push(1)
      else _arr.push(0)
    }
    
    console.log('CANGETPOS-5.', `_arr: ${_arr}`)
    this.wallInfoArr[this.counter] = _arr
    return {arr:_arr, id: this.counter}  
  }
}