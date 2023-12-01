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
      // CLICK.開始遊戲
      case ACTIONS.START:
        state.gameStatus = GAMESTATUS.READY
        state.viewWaitingVisible = false
        break
    }
    changeGameStatus( state.gameStatus )
  }
  // 遊戲狀態處理
  const changeGameStatus = (gameStatus:string) => {
    switch (gameStatus) {
      // 遊戲初始化 
      case GAMESTATUS.WAITING:
        state.viewWaitingVisible = true 
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

  onMounted (() => {
    // new Game()
    Splitting()
  }) 
  // changeGameStatus.run 
  changeGameStatus( state.gameStatus )
</script>

<template>
  <div class="game-snake">

    <!-- WAITING狀態  -->
    <div class="waitting-status all-mask" v-if="state.viewWaitingVisible">
      <div class="main">

        <!-- WELCOME -->
        <div class="header special-box">
          <div class="up-title-block">
            <div class="title up-title rainbow-up" data-splitting> WELCOME </div>
          </div>
          <div class="down-title-block">
            <div class="title down-title rainbow-down headline--fall" data-splitting> WELCOME </div>
          </div>
        </div>

        <!-- BUTTON -->
        <div class="button-bar">
          <button @click="clickListener(ACTIONS.START)">開始遊戲</button>
        </div>

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

<style lang="scss" scoped>
  @import "../assets/css/gameBase.scss";
  @import "../assets/css/snakeGame.scss";
</style>
