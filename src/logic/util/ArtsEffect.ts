/* eslint-disable @typescript-eslint/no-inferrable-types */

const Effects = {
  /**
   * 立體字1
   * layers 厚度
   * color 顏色 
   */
  thickness: (idName:string, layers: number = 5, color:string = '#00ff74', endColor:string|null = null) => {
    const arr = []

    const nd = document.getElementById(idName)
    if (nd === null) return

    for (let i = 0; i < layers; i ++) {
      const r = []
      const x = i + 'px'
      const y = i + 'px'
      r.push(x)
      r.push(y)
      if (i === (layers - 1)) r.push(endColor)
      else r.push(color) 
      arr.push(r.join(' '))
    }
    // return arr.join(',') 
    nd.style.textShadow = arr.join(',') 
    // ArtsEffect.thickness(7, '#b14c4a', '#2a0303')
  }
  

}
export default Effects 