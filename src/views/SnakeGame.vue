<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import Splitting from 'splitting'
  import Game from '@/logic/snake/Game'
  import { GAMESTATUS } from '@/logic/snake/Parameter'
  import { ACTIONS } from '@/logic/util/Parameter'

  // import GameControl from '@/logic/test/GameControl'
  // const gameControl = new GameControl();
  // let gameStatus = GAMESTATUS.WAITING
  defineOptions({
    name: "SnakeGame",
    inheritAttrs: false,
  })

  const state = reactive({
    game: null,
    gameStatus: GAMESTATUS.WAITING,
    viewWaitingVisible: false,
    viewResultVisible: false
  })

  // CLICKLISTENER.事件
  const clickListener = (actions:string) => {
    switch (actions) {
      case ACTIONS.RELOAD:
      case ACTIONS.BACK:
        window.location.reload();
        break
      // CLICK.開始遊戲
      case ACTIONS.START:
        state.gameStatus = GAMESTATUS.READY
        state.viewWaitingVisible = false
        changeGameStatus( state.gameStatus )
        break
    }
  }
  // 遊戲狀態處理
  const changeGameStatus = (gameStatus:string) => {
    switch (gameStatus) {
      // 遊戲初始化 
      case GAMESTATUS.WAITING:
        state.viewWaitingVisible = true 
        console.log('GAMESTATUS.', GAMESTATUS.WAITING )

        // start.animation
        animationStatus('anim01', 'headline--self001', 1000)
        animationStatus('footer', 'headline--self001', 900)
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

  const animationStatus = (animStatus:string, className:string, timeOut:number) => {
    // console.log('animStatus', animStatus)
    setTimeout(() => {
      const nd = document.getElementById(animStatus)
      if (nd !== null) nd.classList.add(className)
    }, timeOut)
  }

  onMounted (() => {
    // new Game()
    Splitting()
  }) 
  // changeGameStatus.run 
  changeGameStatus( state.gameStatus )
</script>

<template>
  <div class="game-base game-snake animations">

    <!-- WAITING狀態  -->
    <div class="waitting-status all-mask" v-if="state.viewWaitingVisible">
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
          <div>
            <span> SETTINGS </span>
          </div>
        </div>

        <div class="settings">
          <ul>
            <li @click="clickListener(ACTIONS.RELOAD)">RELOAD</li>
            <!-- <li>OTHER</li> -->
          </ul>
        </div>
      </div>
      <!-- MAIN -->
      <div class="main">
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
          <button class="button--alpha" @click="clickListener(ACTIONS.START)">開始遊戲</button>
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
