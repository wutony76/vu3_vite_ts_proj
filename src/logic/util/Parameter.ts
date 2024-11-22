
// CLICK事件狀態
export const ACTIONS = {
  GAMEBACK: 'game_back_btn', 
  GAMEPAUSE: 'game_pause_btn', 
  GAMEPLAY: 'game_play_btn', 
  GAMEREPLAY: 'game_replay_btn', 
  GAMERESULT: 'game_result_btn', 

  GAMEDETAILS: 'game_details_btn', 
  GAMECONTROLS: 'game_controls_btn', 
  GAMERANKING: 'game_ranking_btn',

  CONTROLSUP: 'UP',
  CONTROLSLEFT: 'LEFT',
  CONTROLSDOWN: 'DOWN',
  CONTROLSRIGHT: 'RIGHT',

  INDEX: 'go_index',
  SAMPLE: 'go_sample',
  BACK: 'page_back', // 返回BACK
  SETTINGS: 'btn_settings',
  DETAILS: 'btn_details',
  CONTROLS: 'btn_controls',
  RANKING: 'btn_ranking',
  SAVE: 'btn_save',
  RELOAD: 'page_reload',
  START: 'game_start',
  REPLAY: 'game_replay',
  EXIT: 'game_exit',
}
export const VIEWS = {
  WAIT: 'view_wait',
  SETTINGS: 'view_settings',
  DETAILS: 'view_details',
  CONTROLS: 'view_controls',
  RANKING: 'view_ranking',

  NONE:'NONE',
  READY:'READY',
  PLAYING:'PLAYING',
  PAUSE: 'PAUSE',
  RESULT:'RESULT',
  END:'END'
}
export const GAME = {
  ELECTRONIC : {
    SNAKE: 'electronic-snake',
    RACING: 'electronic-racing',
    LOTTERY: 'electronic-lottery',
  }
}
export const STATIC= {
  SPACE: '',
}
export const PATH = {
  LOBBY: '/lobby',
  SNAKE: '/snake',
  RACING: '/racing'
}
export const PATH_NAME = {
  LOBBY: 'Lobby',
  SNAKE: 'Snake',
  RACING: 'Racing',
  LOTTERY: 'Lottery'
}
export const UI = {
  CLICKLEFT: 'click-left',
  CLICKRIGHT: 'click-right',
}
