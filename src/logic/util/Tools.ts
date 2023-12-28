const Tools = {
  getRandom: (min:number, max:number) => {
    return Math.floor(Math.random() * max) + min
  },
  formatSorce: (score:number) => {
    return String(score).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
} 

export default Tools 
