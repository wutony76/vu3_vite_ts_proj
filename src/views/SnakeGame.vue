<script setup lang="ts">
  import { onBeforeUnmount, onMounted, reactive, watch } from 'vue'
  import Splitting from 'splitting'
  import Game from '@/logic/snake/Game'
  import Effects from '@/logic/effects/SnakeEffects'
  import { GAMESTATUS } from '@/logic/snake/Parameter'
  import { ACTIONS, VIEWS } from '@/logic/util/Parameter'
  import { useRouter } from 'vue-router'
  import Tools from '@/logic/util/Tools'
  import ProgressBar from '@/components/Ui/ProgressBar.vue'

  defineOptions({
    name: "SnakeGame",
    inheritAttrs: false,
  })
  const router = useRouter()
  const state = reactive({
    game: null,
    gameStatus: GAMESTATUS.WAITING, // GAMESTATUS.WAITING,
    viewStatus: '',
    showStatus: VIEWS.NONE,
    controlStatus: ACTIONS.CONTROLSRIGHT,
    viewWaitingVisible: false,
    viewReadyVisible: false,
    viewResultVisible: false,
    data: {
      ranking: [
        {rank: '1', name: 'TONY.WU', score: 11924999},
        {rank: '2', name: 'HAPPY.RED', score: 9241134},
        {rank: '3', name: 'HAPPFAT', score: 5133913},
        {rank: '4', name: 'ABIGAIL', score: 3012213},
        {rank: '5', name: 'TTTM.WC', score: 2911424},
        {rank: '6', name: 'TNYAUU', score: 1021681},
        {rank: '7', name: 'TOYO.AC', score: 1002022},
        {rank: '8', name: 'SISI.CC', score: 439290},
        {rank: '9', name: 'GOYES', score: 198021}
      ]
    },
    score: 0,
    level: 1,
    snakeLen: 0,
    fruitCount: 0,
  })

  // const getRandom = (min:number, max:number) => {
  //   return Math.floor(Math.random() * max) + min
  // }
  const prdControlCssClass = () => {
    const arr = []
    for (let i = 0; i < 9; i ++) {
      // RANKING 
      arr.push('rankAnim' + i)
      arr.push('rankNameAnim' + i)
    }
    return arr
  }
  const cssClassArr = prdControlCssClass()
  const colorArr = ['colorff3535', 'colorff8c00', 'colorffff00', 'color00ff00', 'color00bfff', 'colorc989ff', 'colorFF26FF', 'color000085', 'color200137']
  const jumpReturnNum = (element:string, targetNum:number, timeout:number) => {
    var currNum = 0;
    const deltaTime = Math.round(timeout / 50)
    const deltaNum = Math.round(targetNum / deltaTime)
    var interval = setInterval(function () {
      // currNum++;
      currNum += Tools.getRandom(0, deltaNum)
      if (currNum > targetNum) currNum = targetNum
      const node = document.querySelector('#' + element) 
      // if (node) node.innerHTML = currNum + ''
      if (node) node.innerHTML = Tools.formatSorce(currNum)
      if (currNum === targetNum || !node) clearInterval(interval)
    }, 10);
  }
  var selfGame: Game|null = null

  // CLICKLISTENER.事件
  const clickListener = (actions:string) => {
    console.log('ttt.CLICK', actions)
    switch (actions) {
      case ACTIONS.GAMEREPLAY:
        if (state.gameStatus === GAMESTATUS.START) {
          selfGame?.updateStatus(GAMESTATUS.PAUSE)
          setTimeout(() => {
            state.gameStatus = GAMESTATUS.READY
            changeGameStatus(state.gameStatus)
          }, 1000)
        }
        break
      case ACTIONS.GAMEPAUSE:
        if (
          state.gameStatus === GAMESTATUS.START &&
          state.showStatus === VIEWS.PLAYING
        ) {
          selfGame?.updateStatus(GAMESTATUS.PAUSE)
          state.showStatus = VIEWS.PAUSE
        }
        break
      case ACTIONS.GAMEPLAY:
        if (
          state.gameStatus === GAMESTATUS.START &&
          state.showStatus === VIEWS.PAUSE
        ) {
          selfGame?.updateStatus(GAMESTATUS.PLAYING)
          selfGame?.run()
          state.showStatus = VIEWS.PLAYING
        }
        break
      case ACTIONS.GAMERESULT:

          selfGame?.updateStatus(GAMESTATUS.PAUSE)
          state.showStatus = VIEWS.RESULT
          state.gameStatus = GAMESTATUS.RESULT
          setTimeout(() => {
            changeGameStatus(state.gameStatus)
          })
        break

      case ACTIONS.GAMEDETAILS:
        animationRemoveClass('gameDetailsBlock', 'page--show')
        animationRemoveClass('gameDetailsCont1', 'opacityAlpha0')
        animationRemoveClass('gameDetailsCont1', 'opacityAlpha1')
        animationRemoveClass('gameDetailsCont1', 'headline--self001')
        animationRemoveClass('gameDetailsCont2', 'opacityAlpha0')
        animationRemoveClass('gameDetailsCont2', 'opacityAlpha1')
        animationRemoveClass('gameDetailsCont2', 'headline--self001')

        setTimeout(() => {
          animationStatus('gameDetailsBlock', 'page--show', 10)
          animationStatus('gameDetailsCont1', 'opacityAlpha0', 10)
          animationStatus('gameDetailsCont2', 'opacityAlpha0', 10)
          animationStatus('gameDetailsCont1', 'opacityAlpha1', 300)
          animationStatus('gameDetailsCont2', 'opacityAlpha1', 1300)
          animationStatus('gameDetailsCont1', 'headline--self001', 300)
          animationStatus('gameDetailsCont2', 'headline--self001', 1300)
        }, 5)
        break
      case ACTIONS.GAMECONTROLS:
        animationRemoveClass('gameControlsBlock', 'page--show')
        animationRemoveClass('gameControlsBlock', 'opacityAlpha0')
        animationRemoveClass('gameControlsBlock', 'opacityAlpha1')
        animationRemoveClass('gameControlsBlock', 'page--alphaIn')
        setTimeout(() => {
          animationStatus('gameControlsBlock', 'page--show', 10)
          animationStatus('gameControlsBlock', 'opacityAlpha0', 10)
          animationStatus('gameControlsBlock', 'opacityAlpha1', 500)
          animationStatus('gameControlsBlock', 'page--alphaIn', 500)
        }, 5)
        break
      case ACTIONS.GAMERANKING:
        animationRemoveClass('gameRankingBlock', 'page--show')
        animationRemoveClass('gameRankingBlock', 'opacityAlpha0')
        animationRemoveClass('gameRankingBlock', 'opacityAlpha1')
        animationRemoveClass('gameRankingBlock', 'page--alphaIn')

        animationRemoveClass('contactUsBlock', 'page--show')
        animationRemoveClass('gameCaptionTitle1', 'opacityAlpha0')
        animationRemoveClass('gameCaptionTitle1', 'opacityAlpha1')
        animationRemoveClass('gameCaptionTitle1', 'headline--self001')
        animationRemoveClass('gameCaptionCont1', 'opacityAlpha0')
        animationRemoveClass('gameCaptionCont1', 'opacityAlpha1')
        animationRemoveClass('gameCaptionCont1', 'headline--self001')
        animationRemoveClass('gameCaptionCont2', 'opacityAlpha0')
        animationRemoveClass('gameCaptionCont2', 'opacityAlpha1')
        animationRemoveClass('gameCaptionCont2', 'headline--self001')

        animationRemoveClass('infoCaptionEmail', 'opacityAlpha0')
        animationRemoveClass('infoCaptionEmail', 'opacityAlpha1')
        animationRemoveClass('infoCaptionEmail', 'animation-right-btn-move')
        animationRemoveClass('infoCaptionFacebook', 'opacityAlpha0')
        animationRemoveClass('infoCaptionFacebook', 'opacityAlpha1')
        animationRemoveClass('infoCaptionFacebook', 'animation-right-btn-move')
        animationRemoveClass('infoCaptionLinkein', 'opacityAlpha0')
        animationRemoveClass('infoCaptionLinkein', 'opacityAlpha1')
        animationRemoveClass('infoCaptionLinkein', 'animation-right-btn-move')

        setTimeout(() => {
          // RANKING-BLOCK
          animationStatus('gameRankingBlock', 'page--show', 10)
          animationStatus('gameRankingBlock', 'opacityAlpha0', 10)
          animationStatus('gameRankingBlock', 'opacityAlpha1', 3000)
          animationStatus('gameRankingBlock', 'page--alphaIn', 3000)
          // CONTACT-BLOCK
          animationStatus('contactUsBlock', 'page--show', 10)
          animationStatus('gameCaptionTitle1', 'opacityAlpha0', 10)
          animationStatus('gameCaptionTitle1', 'opacityAlpha1', 310 + 300)
          animationStatus('gameCaptionTitle1', 'headline--self001', 310 + 300)
          animationStatus('gameCaptionCont1', 'opacityAlpha0', 10)
          animationStatus('gameCaptionCont2', 'opacityAlpha0', 10)
          animationStatus('gameCaptionCont1', 'opacityAlpha1', 310 + 300)
          animationStatus('gameCaptionCont2', 'opacityAlpha1', 310 + 1310)
          animationStatus('gameCaptionCont1', 'headline--self001', 310 + 300)
          animationStatus('gameCaptionCont2', 'headline--self001', 310 + 1310)
          animationStatus('infoCaptionEmail', 'opacityAlpha0', 10)
          animationStatus('infoCaptionFacebook', 'opacityAlpha0', 10)
          animationStatus('infoCaptionLinkein', 'opacityAlpha0', 10)
          animationStatus('infoCaptionEmail', 'opacityAlpha1', 2100)
          animationStatus('infoCaptionFacebook', 'opacityAlpha1', 2300)
          animationStatus('infoCaptionLinkein', 'opacityAlpha1', 2500)
          animationStatus('infoCaptionEmail', 'animation-right-btn-move', 2100)
          animationStatus('infoCaptionFacebook', 'animation-right-btn-move', 2300)
          animationStatus('infoCaptionLinkein', 'animation-right-btn-move', 2500)
        }, 5)
        break
      
      // CONTROLS
      case ACTIONS.CONTROLSUP:
      case ACTIONS.CONTROLSDOWN:
      case ACTIONS.CONTROLSLEFT:
      case ACTIONS.CONTROLSRIGHT:
        selfGame?.updateControlEvent(actions)
        break

      //
      case ACTIONS.GAMEBACK:
      case ACTIONS.RELOAD:
      case ACTIONS.REPLAY:
        window.location.reload()
        break

      case ACTIONS.BACK:
      case ACTIONS.INDEX:
      case ACTIONS.EXIT:
        animationStatus('container', 'page--alphaOut', 100)
        setTimeout(() => {
          router.replace({path:"/"})
        }, 1000)
        break

      case ACTIONS.SETTINGS:
        animationStatus('settingsBtn', 'button-rotate', 100)
        animationRemoveClass('settingsAnim1', 'animation-intro')
        animationRemoveClass('settingsAnim2', 'animation-intro')
        animationRemoveClass('settingsAnim3', 'animation-intro')
        animationRemoveClass('saveBtn', 'animation-intro')
        animationRemoveClass('settingsAnim01', 'headline--self001')
        animationRemoveClass('settingsAnim02', 'headline--self001')

        setTimeout(() => {
          changeViewStatus (state.viewStatus)
          state.viewStatus = VIEWS.SETTINGS

          animationStatus('settingsAnim1', 'animation-intro', 1300+1000)
          animationStatus('settingsAnim2', 'animation-intro', 1300+1300)
          animationStatus('settingsAnim3', 'animation-intro', 1300+1500)
          animationStatus('saveBtn', 'animation-intro', 1300+2000)

          animationStatus('settingsPageMain', 'page--show', 1300)
          animationStatus('settingsAnim01', 'headline--self001', 2000)
          animationStatus('settingsAnim02', 'headline--self001', 1400)
        })
        break
      case ACTIONS.DETAILS:
        changeViewStatus (state.viewStatus)
        state.viewStatus = VIEWS.DETAILS
        animationStatus('detailsPageMain', 'page--show', 1300)
        animationStatus('detailsAnim01', 'headline--self001', 2000)
        break
      case ACTIONS.CONTROLS:
        animationRemoveClass('contentAnim01', 'headline--self001')
        animationRemoveClass('contentAnim02', 'headline--self001')
        animationRemoveClass('contentAnim03', 'headline--self001')
        animationRemoveClass('contentAnim04', 'headline--self001')
        setTimeout(() => {
          changeViewStatus (state.viewStatus)
          state.viewStatus = VIEWS.CONTROLS
          animationStatus('controlsPageMain', 'page--show', 1300)
          animationStatus('controlsAnim01', 'headline--self001', 2000)

          animationStatus('contentAnim01', 'headline--self001', 100)
          animationStatus('contentAnim02', 'headline--self001', 1500)
          animationStatus('contentAnim03', 'headline--self001', 2100)
          animationStatus('contentAnim04', 'headline--self001', 1000)
        }, 100)
        break
      case ACTIONS.RANKING:
        cssClassArr.forEach((styleAnimName) => {
          animationRemoveClass(styleAnimName, 'headline--self001')
        })

        setTimeout(() => {
          state.data.ranking.forEach((item, index:number) => {
            jumpReturnNum('rankScoreAnim' + index, item.score, Tools.getRandom(5000, 10000))
          }) 
          cssClassArr.forEach((styleAnimName) => {
            animationStatus(styleAnimName, 'headline--self001', Tools.getRandom(1300, 2500))
          })
          changeViewStatus (state.viewStatus)
          state.viewStatus = VIEWS.RANKING
          animationStatus('rankingPageMain', 'page--show', 1300)
          animationStatus('rankingAnim01', 'headline--self001', 2000)
        }, 100);
        break
      case ACTIONS.SAVE:
        window.location.reload()
        break

      case ACTIONS.SAMPLE:
        animationStatus('waittingPage', 'page--alphaOut', 100)
        setTimeout(() => {
          router.replace({path:"/splitting"})
        }, 1000)
        break
      case ACTIONS.START:
        animationStatus('waittingPage', 'page--alphaOut', 100)
        setTimeout(() => {
          state.gameStatus = GAMESTATUS.READY
          state.viewWaitingVisible = false
          changeGameStatus(state.gameStatus)
        }, 1300)
        break
    }
  }
  // 遊戲狀態處理
  const changeGameStatus = (gameStatus:string) => {
    switch (gameStatus) {
      // 遊戲初始化 
      case GAMESTATUS.WAITING:
        state.viewWaitingVisible = true 
        state.viewStatus = VIEWS.WAIT
        state.showStatus = VIEWS.NONE

        // start.animation
        animationStatus('settingsBtn', 'button-rotate', 100)
        animationStatus('anim01', 'headline--self001', 1000)
        animationStatus('footer', 'headline--self001', 900)
        animationStatus('startBtn', 'button--alpha', 3000)
        break
      // 遊戲準備中倒數3秒
      case GAMESTATUS.READY:
        animationRemoveClass('scanLight', 'animation-scan-lights')
        state.showStatus = VIEWS.READY

        setTimeout(() => {
          state.viewReadyVisible = true 
          animationStatus('numberAnim1', 'animation-zoom-in', 10)
          animationStatus('numberAnim2', 'animation-zoom-in', 1510)
          animationStatus('numberAnim3', 'animation-zoom-in', 3010)
          animationStatus('scanLight', 'animation-scan-lights', 4500)
        }, 10)
        setTimeout(() => {
          state.viewReadyVisible = false 
          state.gameStatus = GAMESTATUS.START
          changeGameStatus( state.gameStatus )
        }, 4500)
        break
      // 遊戲開始
      case GAMESTATUS.START:
        state.showStatus = VIEWS.PLAYING
        state.viewReadyVisible = false 
        animationRemoveClass('numberAnim1', 'animation-zoom-in')
        animationRemoveClass('numberAnim2', 'animation-zoom-in')
        animationRemoveClass('numberAnim3', 'animation-zoom-in')
        animationStatus('gameTitleAnim', 'headline--self001', 10)
        // animationStatus('gameTitleAnim2', 'headline--self001', 10)

        animationStatus('gameAnim1', 'animation-left-btn-move', 110)
        animationStatus('gameAnim2', 'animation-left-btn-move', 310)
        animationStatus('gameAnim3', 'animation-left-btn-move', 510)
        animationStatus('gameAnim4', 'animation-left-btn-move', 710)
        animationStatus('gameAnim5', 'animation-left-btn-move', 910)
        animationStatus('gameAnim1', 'animation-right', 1900)
        animationStatus('gameAnim2', 'animation-right', 1700)
        animationStatus('gameAnim3', 'animation-right', 1500)
        animationStatus('gameAnim4', 'animation-right', 1300)
        animationStatus('gameAnim5', 'animation-right', 1100)

        animationStatus('gameRightAnim1', 'animation-right-btn-move', 260)
        animationStatus('gameRightAnim2', 'animation-right-btn-move', 460)
        animationStatus('gameRightAnim3', 'animation-right-btn-move', 660)
        animationStatus('gameRightAnim1', 'animation-left', 1650)
        animationStatus('gameRightAnim2', 'animation-left', 1450)
        animationStatus('gameRightAnim3', 'animation-left', 1250)

        simulationClick('gameRightDetails', 3000)
        simulationClick('gameRightControls', 4000)
        simulationClick('gameRightRanking', 4500)
        
        selfGame = new Game(state)
        selfGame.setCallback(() => {
          // 設定.RESULT STATUS
          state.gameStatus = GAMESTATUS.RESULT
          setTimeout(() => {
            changeGameStatus( state.gameStatus )
          }, 1000)
        })
        break
      // 遊戲結果
      case GAMESTATUS.RESULT:
        animationRemoveClass('scanLight', 'animation-scan-lights')
        state.showStatus = VIEWS.RESULT
        state.viewResultVisible = true

        setTimeout(() => {
          animationStatus('resultStatusTitleAnim01', 'opacityCharAlpha0', 10)
          animationStatus('resultStatusTitleAnim01', 'headline--self001', 300)
          animationStatus('resultStatusTitleAnim02', 'opacityCharAlpha0', 10)
          animationStatus('resultStatusTitleAnim02', 'headline--self001', 10)
          //resultItemAnim01
          animationStatus('resultItemAnim01', 'opacityAlpha0', 10)
          animationStatus('resultItemAnim01', 'opacityAlpha1', 500)
          animationStatus('resultItemAnim01', 'animation-right-btn-move', 500)
          animationStatus('resultItemAnim02', 'opacityAlpha0', 10)
          animationStatus('resultItemAnim02', 'opacityAlpha1', 1000)
          animationStatus('resultItemAnim02', 'animation-right-btn-move', 1000)
          animationStatus('resultItemAnim03', 'opacityAlpha0', 10)
          animationStatus('resultItemAnim03', 'opacityAlpha1', 1500)
          animationStatus('resultItemAnim03', 'animation-right-btn-move', 1500)
          animationStatus('resultItemAnim04', 'opacityAlpha0', 10)
          animationStatus('resultItemAnim04', 'opacityAlpha1', 2000)
          animationStatus('resultItemAnim04', 'animation-right-btn-move', 2000)
          // button
          animationStatus('rePlayBtn', 'button--alpha', 2500)
          animationStatus('exitGameBtn', 'button--alpha', 2500)

          // run.effects
          setTimeout(() => {
            new Effects()
            animationStatus('resultEffectsBox', 'page--alphaIn', 10)
          }, 2500)
        })
        break
    }
  }

  // ANIMATIONS CLASS.處理邏輯
  const animationStatus = (animStatus:string, className:string, timeOut:number) => {
    setTimeout(() => {
      const nd = document.getElementById(animStatus)
      switch (className) {
        // case 'headline--self001':
        //   if (nd !== null) nd.classList.remove('headline--self001')
        //   break
        case 'page--show':
          if (nd !== null) nd.classList.remove('page--hide')
          break
        case 'page--hide':
          if (nd !== null) {
            nd.classList.remove('page--alphaOut')
            nd.classList.remove('page--show')
          }
          break
      }
      // 新增動畫
      if (nd !== null) {
        nd.classList.add(className)
        // 執行完移除
        switch (className) {
          case 'button-rotate':
            if (nd !== null) {
              setTimeout(() => {
                nd.classList.remove('button-rotate')
              }, 1100)
            }
            break
        }
      }
    }, timeOut)
  }
  const animationRemoveClass = (animStatus: string, className: string) => {
    const nd = document.getElementById(animStatus)
    if (nd !== null) nd.classList.remove(className) 
  }
  const simulationClick = (elementId:string, timeOut: number) => {
    setTimeout(() => {
      document.getElementById(elementId)?.click()
    }, timeOut)
  }
  const changeViewStatus = (viewStatus:string) => {
    switch (viewStatus) {
      case VIEWS.WAIT:
        animationStatus('waittingPageMain', 'page--alphaOut', 100)
        animationStatus('waittingPageMain', 'page--hide', 1300)
        break
      case VIEWS.SETTINGS:
        animationStatus('settingsPageMain', 'page--alphaOut', 100)
        animationStatus('settingsPageMain', 'page--hide', 1300)
        break
      case VIEWS.DETAILS:
        animationStatus('detailsPageMain', 'page--alphaOut', 100)
        animationStatus('detailsPageMain', 'page--hide', 1300)
        break
      case VIEWS.CONTROLS:
        animationStatus('controlsPageMain', 'page--alphaOut', 100)
        animationStatus('controlsPageMain', 'page--hide', 1300)
        break
      case VIEWS.RANKING:
        animationStatus('rankingPageMain', 'page--alphaOut', 100)
        animationStatus('rankingPageMain', 'page--hide', 1300)
        break
    }
  }
  // const destoryClass = () => {
  //   animationRemoveClass('settingsBtn', 'button-rotate')
  //   animationRemoveClass('anim01', 'headline--self001')
  //   animationRemoveClass('footer', 'headline--self001')
  //   animationRemoveClass('startBtn', 'button--alpha')
  //   animationRemoveClass('waittingPage', 'page--alphaOut')
  // }

  watch(() => [state.showStatus, selfGame?.score], (newVal, oldVal) => {
    console.log( 'watch', newVal, oldVal)
    setTimeout(() => {
      // Splitting()
    }, 100)
  })
  onMounted (() => {
    Splitting()
  }) 
  onBeforeUnmount(() => {
    // console.log('ttt.onBeforeUnmount')
  })
  changeGameStatus( state.gameStatus)
</script>

<template>
  <div class="game-base game-snake animations">
    <div id="container" class="game-container">

      <!-- WAITING狀態  -->
      <div id="waittingPage" class="waitting-status all-mask" v-if="state.viewWaitingVisible">
        <!-- HEADER -->
        <div class="nvbar">
          <div class="button back">
            <span class="
              self button--twirl
            " data-splitting
            @click="clickListener(ACTIONS.BACK)"
            >BACK</span>
          </div>

          <div class="button settings">
            <span id="settingsBtn" class="icon-btn" @click="clickListener(ACTIONS.SETTINGS)">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="23px"
              height="23px"
              viewBox="0 0 1269.000000 1280.000000"
              preserveAspectRatio="xMidYMid meet">
              <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              fill="#00ff00" stroke="none">
              <path d="M6185 12793 c-802 -46 -1899 -350 -2688 -744 -138 -69 -203 -106
            -334 -191 -122 -80 -128 -92 -127 -263 1 -205 47 -380 236 -890 128 -344 188
            -521 188 -548 0 -15 -13 -29 -40 -45 -180 -103 -670 -638 -790 -864 -17 -31
            -39 -60 -50 -63 -54 -17 -222 38 -641 210 -393 162 -565 224 -714 261 -109 26
            -222 32 -247 12 -42 -35 -258 -455 -366 -713 -284 -682 -512 -1532 -588 -2192
            -11 -90 -18 -229 -18 -355 l-1 -206 30 -42 c41 -58 129 -108 266 -153 152 -49
            282 -78 610 -132 280 -46 327 -55 437 -81 87 -21 138 -40 173 -64 25 -18 29
            -28 29 -68 0 -60 23 -188 56 -317 78 -305 247 -756 339 -907 30 -48 34 -60 25
            -83 -27 -70 -116 -152 -515 -467 -379 -300 -526 -441 -568 -547 l-17 -42 47
            -82 c479 -839 1602 -1934 2396 -2333 68 -35 73 -36 122 -25 82 18 151 66 275
            189 123 123 193 207 410 492 233 307 339 420 395 420 13 0 56 -16 97 -35 235
            -113 876 -267 1173 -282 87 -4 125 -10 138 -21 38 -34 76 -201 127 -567 60
            -427 102 -638 158 -805 37 -107 61 -154 108 -209 l38 -44 201 6 c266 8 461 33
            780 98 654 134 1435 428 2006 754 212 122 322 199 342 240 25 53 22 169 -7
            285 -40 155 -75 242 -310 762 -87 194 -129 318 -124 374 3 35 9 43 64 79 109
            72 206 156 394 345 246 245 443 478 500 591 24 47 52 54 135 34 89 -20 203
            -64 553 -211 314 -132 537 -212 664 -238 77 -16 184 -21 223 -10 22 6 83 100
            173 269 309 580 582 1498 691 2320 38 288 45 392 46 635 0 271 -2 280 -66 334
            -118 100 -331 156 -889 236 -358 51 -505 86 -542 128 -10 10 -18 48 -22 97
            -15 174 -68 391 -170 697 -77 233 -154 424 -200 497 -18 28 -26 51 -22 65 15
            60 132 171 371 354 385 294 610 492 686 605 57 86 58 100 19 172 -491 890
            -1668 2117 -2374 2472 -58 29 -76 34 -109 29 -141 -23 -315 -183 -609 -558
            -279 -356 -322 -409 -392 -480 -41 -41 -89 -81 -105 -88 -28 -11 -37 -9 -103
            23 -170 84 -479 170 -833 232 -132 23 -343 45 -376 38 -75 -15 -111 92 -164
            482 -57 427 -77 565 -96 665 -41 214 -102 385 -156 442 l-27 28 -135 -2 c-75
            -1 -158 -3 -186 -5z m582 -5049 c292 -43 530 -160 713 -350 186 -193 289 -407
            347 -719 26 -141 26 -497 0 -640 -97 -531 -441 -886 -965 -995 -286 -60 -649
            -42 -897 43 -470 162 -753 531 -825 1070 -15 114 -12 372 5 485 92 612 500
            1017 1115 1106 132 19 379 19 507 0z"/>
              </g>
              </svg>
            </span>
            <!-- 右邊選項 -->
            <div class="settings-list-right">
              <ul>
                <li @click="clickListener(ACTIONS.SETTINGS)">SETTINTS</li>
                <li @click="clickListener(ACTIONS.RELOAD)">RELOAD</li>
                <li @click="clickListener(ACTIONS.DETAILS)">DETAILS</li>
                <li @click="clickListener(ACTIONS.CONTROLS)">CONTROL</li>
                <li @click="clickListener(ACTIONS.RANKING)">RANKING</li>
              </ul>
            </div>
            <!-- 左邊選項 -->
            <div class="settings-list-left">
              <ul>
                <li @click="clickListener(ACTIONS.SAMPLE)"> SPLITTING</li>
                <li @click="clickListener(ACTIONS.SAMPLE)">CSS3D</li>
                <li @click="clickListener(ACTIONS.SAMPLE)">ANIMATION</li>
                <li @click="clickListener(ACTIONS.SAMPLE)">FONTS</li>
                <li @click="clickListener(ACTIONS.SAMPLE)">SAMPLE</li>
                <li @click="clickListener(ACTIONS.INDEX)">GOINDEX</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- MAIN (waitting-page) -->
        <div id="waittingPageMain" class="main">
          <!-- WELCOME -->
          <div class="header special-box">
            <!-- 主標題 -->
            <!-- <div class="up-title-block">
              <div class="
                title
                up-title
                rainbow-up
              "
              data-splitting> WELCOME </div>
            </div>
            <div class="down-title-block">
              <div class="
                title
                down-title
                rainbow-down
              "
              data-splitting> WELCOME </div>
            </div> -->

            <!-- 標題1 -->
            <div class="title-block">
              <div id="anim01" class="
                title
                headline self
              "
              data-splitting> WELCOME </div>
            </div>
            <!-- 標題2 -->
            <div class = "title-second-block">
              <div id="anim02" class="
                title2
                headline self headline--self001
              " data-splitting> CLICK START BUTTON START GAME. </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div class="button-bar">
            <button id="startBtn"
              @click="clickListener(ACTIONS.START)">START</button>
          </div>
        </div>
        <!-- MAIN (settings-page) -->
        <div id="settingsPageMain" class="main settingsPage page--hide">
          <!-- SETTINGS -->
          <div class="header special-box">
            <!-- 標題1 -->
            <div class="title-block">
              <div id="settingsAnim01" class="title headline self"
              data-splitting> SETTINGS </div>
            </div>
            <!-- 標題2 -->
            <div class = "title-second-block">
              <div id="settingsAnim02" class="title2 headline self" data-splitting> BASIC GAME SETTINGS. </div>
            </div>
          </div>
          <div class="main-block">
            <div id="settingsAnim1" class="settings-block">
              <div class="title"> BGM </div>
              <div class="content"> <ProgressBar ></ProgressBar> </div>
            </div>
            <div id="settingsAnim2" class="settings-block">
              <div class="title"> SE </div>
              <div class="content"> <ProgressBar ></ProgressBar> </div>
            </div>
            <div id="settingsAnim3" class="settings-block">
              <div class="title"> VOICE </div>
              <div class="content"> <ProgressBar ></ProgressBar> </div>
            </div>

          </div>
          <!-- BUTTON -->
          <div class="button-block">
            <button id="saveBtn" class="button-save"
              @click="clickListener(ACTIONS.SAVE)">SAVE</button>
          </div>
        </div>

        <!-- MAIN (details-page) -->
        <div id="detailsPageMain" class="main detailsPage page--hide">
          <!-- SETTINGS -->
          <div class="header special-box">
            <!-- 標題1 -->
            <div class="title-block">
              <div id="detailsAnim01" class="
                title
                headline self
              "
              data-splitting> DETAILS </div>
            </div>
            <!-- content -->
            <div class = "title-second-block">
              <div id="anim02" class="title2 content-block headline self headline--self001 " data-splitting> In the game, the player controls the snake, </div>
              <div id="anim02" class="title2 headline self headline--self001 " data-splitting>  which will keep moving forward, picking up objects it touches along the way,</div>
              <div id="anim02" class="title2 headline self headline--self001 " data-splitting> and must avoid touching itself or other obstacles. </div>

              <div id="anim02" class="title2 content-block headline self headline--self001 " data-splitting> Every time the greedy snake eats a piece of food, </div>
              <div id="anim02" class="title2 headline self headline--self001 " data-splitting>its body grows a little. </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div class="button-bar">
            <button id="startBtn"
              @click="clickListener(ACTIONS.START)">START</button>
          </div>
        </div>
        <!-- MAIN (controls-page) -->
        <div id="controlsPageMain" class="main controlsPage page--hide">
          <!-- SETTINGS -->
          <div class="header special-box">
            <!-- 標題1 -->
            <div class="title-block">
              <div id="controlsAnim01" class="
                title
                headline self
              "
              data-splitting> CONTROLS </div>
            </div>
            <!-- content -->
            <div class = "title-second-block">
              <div id="contentAnim01" class="title2 content-block margin-top50 headline self" data-splitting> Hit the <span class="red">W</span> key on the keyboard to make the snake turn upward. </div>
              <div id="contentAnim02" class="title2 content-block headline self" data-splitting> Hit the <span class="yellow">S</span> key on the keyboard to make the snake turn downward.</div>
              <div id="contentAnim03" class="title2 content-block headline self" data-splitting> Hit the <span class="orange">A</span> key on the keyboard to make the snake turn to the left. </div>
              <div id="contentAnim04" class="title2 content-block headline self" data-splitting> Hit the <span class="blue">D</span> key on the keyboard to make the snake turn to the right. </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div class="button-bar">
            <button id="startBtn"
              @click="clickListener(ACTIONS.START)">START</button>
          </div>
        </div>
        <div id="rankingPageMain" class="main rankingPage page--hide">
          <div class="header special-box">
            <div class="title-block">
              <div id="rankingAnim01" class=" title headline self " data-splitting> RANKING </div>
            </div>

            <!-- content -->
            <div class = "title-second-block">
              <div class="ranking-block" :class="colorArr[index]"
                v-for="(item, index) in state.data.ranking"
                :key="index">
                <div :id="'rankAnim' + index" class="rank
                  headline self
                  " data-splitting> {{ item.rank }} </div>
                <div :id="'rankNameAnim' + index" class="name
                  headline self
                  " data-splitting> {{ item.name }} </div>
                <div :id="'rankScoreAnim' + index" class="score"> {{ item.score }} </div>
              </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div class="button-bar">
            <button id="startBtn"
              @click="clickListener(ACTIONS.START)">START</button>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          <hr/>
          <div id="footer" class="
            content
            headline self
          " data-splitting> TONY.WORKS@2023.12 </div>
        </div>
      </div>
      <!-- READY狀態  -->
      <div id="readyPage"  class="ready-status all-mask" v-if="state.viewReadyVisible">
        <div class="main">
          <div class="header special-box">
            <div id="numberAnim1" class="number"> 3 </div>
            <div id="numberAnim2" class="number"> 2 </div>
            <div id="numberAnim3" class="number"> 1 </div>
          </div>
        </div>
      </div>
      <!-- RESULT狀態  -->
      <div class="result-status all-mask" v-show="state.viewResultVisible">
        <div class="main">
          <div class="header special-box">
            <div id="resultStatusTitleAnim01" class="title headline self" data-splitting> RESULT </div>
            <div id="resultStatusTitleAnim02" class="title2 headline self" data-splitting> CLICK AGAIN CAN RESTART PLAY </div>
          </div>

          <div class="list-block">
            <div id="resultItemAnim01" class="item">
              <div class="label">SCORE</div>
              <div class="score">{{ state.score }}</div>
            </div>
            <div id="resultItemAnim02" class="item">
              <div class="label">LEVEL</div>
              <div class="score">{{ state.level }}</div>
            </div>
            <div id="resultItemAnim03" class="item">
              <div class="label">SNAKELEN</div>
              <div class="score">{{ state.snakeLen }}</div>
            </div>
            <div id="resultItemAnim04" class="item">
              <div class="label">FRUIT</div>
              <div class="score">{{ state.fruitCount }}</div>
            </div>
          </div>

          <div class="button-bar result-bar">
            <button id="rePlayBtn" @click="clickListener(ACTIONS.REPLAY)">AGAIN</button>
            <button id="exitGameBtn"
              class="exit-button"
              @click="clickListener(ACTIONS.EXIT)">EXIT</button>
          </div>

          <div id="resultEffectsBox" class="effectsBox">
            <div id="snakeEffects" class="snakeEffects">
              <div class="header"></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id="snakeEffects2" class="snakeEffects">
              <div class="header"></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- <br/> boolean = {{ state.showStatus === VIEWS.PAUSE }}
      <br/> showStatus = {{ state.showStatus }}
      <br/> GAMEPAUSE = {{ VIEWS.PAUSE }} -->

      <div id="gameSnake" class="gameSnake-container">
        <div class="game-center">
          <div class="gameHeader">
            <!-- left-block -->
            <div class="left-block">
              <div id="gameAnim1" class="btn-item">
                <div class="button" @click="clickListener(ACTIONS.GAMEBACK)"> BACK </div>
              </div>
              <div id="gameAnim2" class="btn-item">
                <div class="button" @click="clickListener(ACTIONS.GAMEPLAY)"> PLAYING </div>
              </div>
              <div id="gameAnim3" class="btn-item">
                <div class="button" @click="clickListener(ACTIONS.GAMEPAUSE)"> PAUSE </div>
              </div>
              <div id="gameAnim4" class="btn-item">
                <div class="button" @click="clickListener(ACTIONS.GAMEREPLAY)">
                  GAME <span class="space"></span> REPLAY
                </div>
              </div>
              <div id="gameAnim5" class="btn-item">
                <div class="button" @click="clickListener(ACTIONS.GAMERESULT)">
                  GAME <span class="space"></span> RESULT
                </div> 
              </div>

              <div id="gameRankingBlock" class="ranking-block page--hide">
                <div class="title"> RANKING </div>
                <div class="main-block">
                  <div class="item"> John </div>
                  <div class="item"> Toyo222 </div>
                  <div class="item"> FAT333 </div>
                  <div class="item"> HappyFAT </div>
                  <div class="item"> FatYoYo </div>
                  <div class="item"> Anay </div>
                  <div class="item"> Candy </div>
                  <div class="item"> PPig </div>
                  <div class="item"> myKing </div>
                  <div class="item"> 54987 </div>
                  <div class="item"> 1951 </div>
                  <div class="item"> Gogo333 </div>
                  <div class="item"> Mr.Yo </div>
                  <div class="item"> Ms.123 </div>
                  <div class="item"> white </div>
                  <div class="item"> TONY </div>
                  <div class="item"> WU.tony </div>
                  <div class="item"> archer </div>
                  <div class="item"> Jojo </div>
                  <div class="item"> ABC </div>
                  <div class="item"> Digg </div>
                  <div class="item"> SHEEP </div>
                  <div class="item"> sleep.King </div>
                  <div class="item"> Yang </div>
                  <div class="item"> Tang </div>
                  <div class="item"> Tung </div>
                  <div class="item"> PIG </div>
                  <div class="item"> GG123 </div>
                  <div class="item"> 2241 </div>
                  <div class="item"> AAA </div>
                  <div class="item"> ddd3v </div>
                  <div class="item"> GG14s </div>
                  <div class="item"> 24ss </div>
                  <div class="item"> M64 </div>
                  <div class="item"> END21 </div>
                </div>
                <div class="footer"> HISTORY.RANKING </div>
              </div> 
              <div id="contactUsBlock" class="contact-block page--hide">
                <div class="content">
                  <div id="gameCaptionTitle1" class="title headline self" data-splitting> CONTACT DEVELOPER </div>
                  <div class="main-block">
                    <div class="caption">
                      <span id="gameCaptionCont1" class="c1 headline self" data-splitting>
                        If you have any questions or suggestions in the game, please contact me.
                      </span>
                      <span id="gameCaptionCont2" class="c2 headline self" data-splitting>
                        I am a happy fat nerd who likes to play games and watch movies.
                      </span>
                    </div>

                    <div class="info-block">
                      <div id="infoCaptionEmail" class="email"> E-mail: wutony76@gmail.com </div>
                      <div id="infoCaptionFacebook" class="facebook"> Facebook: wutony76@gmail.com </div>
                      <div id="infoCaptionLinkein" class="linkein"> LinkedIn: wutony76@gmail.com </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- right-block -->
            <div class="right-block">
              <div id="gameRightAnim1" class="btn-item">
                <div id="gameRightDetails" class="button" @click="clickListener(ACTIONS.GAMEDETAILS)"> DETAILS </div>
              </div>
              <div id="gameRightAnim2" class="btn-item">
                <div id="gameRightControls" class="button" @click="clickListener(ACTIONS.GAMECONTROLS)"> CONTROLS </div>
              </div>
              <div id="gameRightAnim3" class="btn-item">
                <div id="gameRightRanking" class="button" @click="clickListener(ACTIONS.GAMERANKING)"> RANKING </div>
              </div>

              <div id="gameDetailsBlock" class="details-block page--hide">
                <div class="content">
                  <div id="gameDetailsCont1" class="block headline self" data-splitting>
                    In the game, the player controls the snake.
                  </div>
                  <div id="gameDetailsCont2" class="block eadline self" data-splitting>
                    which will keep moving forward, picking up objects it touches along the way.
                  </div>
                </div>
              </div>
              <div id="gameControlsBlock" class="controls-block page--hide">
                <div class="content">
                  <div class="title">CONTROLS</div>
                  <div class="main-block">
                    <div class="controls-btn up"
                      :class="[state.controlStatus === ACTIONS.CONTROLSUP? 'isSelect':'']"
                      @click="clickListener(ACTIONS.CONTROLSUP)"
                    >UP</div>
                    <div class="controls-btn left"
                      :class="[state.controlStatus === ACTIONS.CONTROLSLEFT ? 'isSelect' : '']"
                      @click="clickListener(ACTIONS.CONTROLSLEFT)"
                    >LEFT</div>
                    <div class="controls-btn down"
                      :class="[state.controlStatus === ACTIONS.CONTROLSDOWN ? 'isSelect' : '']"
                      @click="clickListener(ACTIONS.CONTROLSDOWN)"
                    >DOWN</div>
                    <div class="controls-btn right"
                      :class="[state.controlStatus === ACTIONS.CONTROLSRIGHT ? 'isSelect' : '']"
                      @click="clickListener(ACTIONS.CONTROLSRIGHT)"
                    >RIGHT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="title-block">
            <h1 id="gameTitleAnim" class="headline self" data-splitting> SNAKE </h1>
          </div>

          <div class="status-block">
            <h5 id="gameTitleAnim2">
              {{ state.showStatus }}
              <!-- - {{ state.controlStatus }} -->
            </h5>
          </div>

          <!--创建游戏的主容器  -->
          <div id="main">
            <div class="mainBackground"></div>
            <!-- 设置游戏的舞台 -->
            <div id="stage">

              <!-- 设置蛇 -->
              <div id="snake">
                <!-- snake内部的div 表示蛇的各部分-->
                <div class="head"></div>
              </div>

              <!-- 设置食物 -->
              <div id="food">
                <!-- 设置四个小div来设置食物的样式 -->
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 设置计分盘 -->
            <div id="score-panel">
              <div class="block"> 
                SCORE
                <span class="semicolon">:</span>
                <span id="score"> {{ state.score }} </span>
              </div>
              <div class="block">
                LEVEL
                <span class="semicolon">:</span>
                <span id="level">{{ state.level }}</span>
              </div>
            </div>
            <i id="scanLight" class="scan"></i>
          </div>

          <div class="footer"> SNAKE.GAME @ 2023.12 </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/gameBase.scss";
  @import "../assets/css/snakeGame.scss";
  @import "../assets/css/animations.scss";
</style>
