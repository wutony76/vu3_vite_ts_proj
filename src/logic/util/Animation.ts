const ANIMATIONS = {
  addClass: (idName:string, className: string, timeout:number) => {
    setTimeout(() => {
      const nd = document.getElementById(idName)
      // console.log('nd ', nd)
      if (nd !== null) {
        nd.classList.add(className)
        // console.log('nd ', nd.classList)
        // 執行完移除
        // switch (className) {
        //   case 'button-rotate':
        //     if (nd !== null) {
        //       setTimeout(() => {
        //         nd.classList.remove('button-rotate')
        //       }, 1100)
        //     }
        //     break
        // }
      }
    }, timeout)
  },

  removeClass: (idName:string, className: string) => {
    const nd = document.getElementById(idName)
    if (nd !== null) nd.classList.remove(className) 
  }
} 
export default ANIMATIONS
