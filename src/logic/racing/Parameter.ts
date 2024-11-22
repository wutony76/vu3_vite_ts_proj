// EVENT方向 
export const EVENTS = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd'
}

// CAR狀態
export const CARSTATUS = {
  NONE:'car_none',
  GOOD:'car_good',
  GENERAL:'car_general',
  BAD:'car_bad',

  QUICK: 'car_quick',
  INVINCIBLE: 'car_invincible',
  OVER:'car_over',
  DIE:'car_die',
}

// 遊戲狀態
export const GAMESTATUS = {
  NONE: 'none',
  WAITING: 'waiting',
  READY: 'ready',
  START: 'start',
  PAUSE: 'pause',
  PLAYING: 'playing',
  END: 'end',
  RESULT: 'result'
}