const ANIMATIONS = {
  // 設定節點CSS-CLASS
  addClass: (idName:string, className: string, timeout:number) => {
    setTimeout(() => {
      const nd = document.getElementById(idName)
      if (nd !== null) nd.classList.add(className)
    }, timeout)
  },

  // 設定子節點CSS-CLASS
  addSubClass: (parentIdName:string, className: string, timeout:number) => {
    console.log('parentIdName ', parentIdName)
    setTimeout(() => {
      const nd = document.getElementById(parentIdName)
      const items = nd?.getElementsByClassName('game-block')
      const len = items? items.length : 0
      for (let i=0; i<len; i++ ) {
        const subNd = items[i]
        subNd.classList.add(className) 
      }
    }, timeout)
  },

  removeSubClass: (parentIdName:string, className: string, timeout:number) => {
    console.log('parentIdName ', parentIdName)
    setTimeout(() => {
      const nd = document.getElementById(parentIdName)
      const items = nd?.getElementsByClassName('game-block')
      const len = items? items.length : 0
      for (let i=0; i<len; i++ ) {
        const subNd = items[i]
        subNd.classList.remove(className) 
      }
    }, timeout)
  },

  removeClass: (idName:string, className: string) => {
    const nd = document.getElementById(idName)
    if (nd !== null) nd.classList.remove(className) 
  }
} 
export default ANIMATIONS
