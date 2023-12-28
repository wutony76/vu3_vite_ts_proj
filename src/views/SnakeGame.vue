<script setup lang="ts">
  import { onBeforeUnmount, onMounted, reactive, setTransitionHooks } from 'vue'
  import Splitting from 'splitting'
  import Game from '@/logic/snake/Game'
  import { GAMESTATUS } from '@/logic/snake/Parameter'
  import { ACTIONS, VIEWS } from '@/logic/util/Parameter'
  import { useRouter } from 'vue-router'
  import Tools from '@/logic/util/Tools'

  defineOptions({
    name: "SnakeGame",
    inheritAttrs: false,
  })
  const router = useRouter()
  const state = reactive({
    game: null,
    gameStatus: GAMESTATUS.WAITING, // GAMESTATUS.WAITING,
    viewStatus: '',
    viewWaitingVisible: false,
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
    }
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

  // CLICKLISTENER.事件
  const clickListener = (actions:string) => {
    switch (actions) {
      case ACTIONS.RELOAD:
        window.location.reload();
        break
      case ACTIONS.BACK:
      case ACTIONS.INDEX:
        // animationStatus('waittingPage', 'page--alphaOut', 100)
        animationStatus('gameSnake', 'page--alphaOut', 100)
        setTimeout(() => {
          router.replace({path:"/"})
        }, 1000)
        break

      case ACTIONS.SETTINGS:
        animationStatus('settingsBtn', 'button-rotate', 100)
        changeViewStatus (state.viewStatus)
        state.viewStatus = VIEWS.SETTINGS
        animationStatus('settingsPageMain', 'page--show', 1300)
        animationStatus('settingsAnim01', 'headline--self001', 2000)
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
      // case GAMESTATUS.NONE:
      //   setTimeout(() => {
      //     state.gameStatus = GAMESTATUS.WAITING
      //     changeGameStatus( state.gameStatus )
      //   }, 100);
      //   break

      // 遊戲初始化 
      case GAMESTATUS.WAITING:
        state.viewWaitingVisible = true 
        state.viewStatus = VIEWS.WAIT
        // start.animation
        animationStatus('settingsBtn', 'button-rotate', 100)
        animationStatus('anim01', 'headline--self001', 1000)
        animationStatus('footer', 'headline--self001', 900)
        animationStatus('startBtn', 'button--alpha', 3000)
        break

      // 遊戲準備中倒數3秒
      case GAMESTATUS.READY:
        setTimeout(() => {
          state.gameStatus = GAMESTATUS.START
          changeGameStatus( state.gameStatus )
        }, 3000)
        break

      // 遊戲開始
      case GAMESTATUS.START:
        new Game().setCallback(() => {
          // 設定.RESULT STATUS
          state.gameStatus = GAMESTATUS.RESULT
          setTimeout(() => {
            changeGameStatus( state.gameStatus )
          }, 1000)
        })
        break

      // 遊戲結果
      case GAMESTATUS.RESULT:
        state.viewResultVisible = true
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

  onMounted (() => {
    Splitting()
  }) 
  onBeforeUnmount(() => {
    console.log('ttt.onBeforeUnmount')
    animationRemoveClass('settingsBtn', 'button-rotate')
    animationRemoveClass('anim01', 'headline--self001')
    animationRemoveClass('footer', 'headline--self001')
    animationRemoveClass('startBtn', 'button--alpha')
  })
  changeGameStatus( state.gameStatus )
</script>

<template>
  <div id="gameSnake" class="game-base game-snake animations">

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
            <div id="settingsAnim01" class="
            title
            headline self
          "
            data-splitting> SETTINGS </div>
          </div>
          <!-- 標題2 -->
          <div class = "title-second-block">
            <div id="anim02" class="
            title2
            headline self headline--self001
          " data-splitting> BASIC GAME SETTINGS. </div>
          </div>
        </div>
        <!-- BUTTON -->
        <div class="button-bar">
          <button id="startBtn"
            @click="clickListener(ACTIONS.START)">START</button>
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

    <!-- RESULT狀態  -->
    <div class="result-status all-mask" v-if="state.viewResultVisible">
      <div class="main">
        <div class="header special-box">
          <div class="title" data-splitting="lines"> RESULT </div>
        </div>
        <div class="button-bar result-bar">
          <button @click="clickListener(ACTIONS.START)">重新開始</button>
          <button @click="clickListener(ACTIONS.START)">離開遊戲</button>
        </div>
      </div>
    </div>

    <h1> SNAKE </h1>

    <!--创建游戏的主容器  -->
    <div id="main">
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
        <div> SCORE: <span id="score">0</span> </div>
        <div> LEVEL: <span id="level">1</span> </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  @import "../assets/css/gameBase.scss";
  @import "../assets/css/snakeGame.scss";
  @import "../assets/css/animations.scss";
</style>
