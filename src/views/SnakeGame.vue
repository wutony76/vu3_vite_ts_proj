<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import Game from '@/logic/snake/Game'
  import {GAMESTATUS} from '@/logic/snake/Parameter'

  // import GameControl from '@/logic/test/GameControl'
  // const gameControl = new GameControl();
  let gameStatus = GAMESTATUS.WAITING

  defineOptions({
    name: "SnakeGame",
    inheritAttrs: false,
  })

  const state = reactive({
    checkGameStatus: GAMESTATUS.WAITING
  })

  onMounted (() => {
    // const game:any = new Game()
    // game.init()
    new Game()
    // new GameControl()
  }) 

  // const checkGameStatus = 

</script>

<template>
  <div class="game-snake">
    <!-- gameStatus = {{ gameStatus }} -->
    {{ state.checkGameStatus }}
    <h1> SNAKE </h1>

    <div
      v-if="state.checkGameStatus === GAMESTATUS.WAITING"
    >
      START GAME!
    </div>

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
  @import "../assets/css/snakeGame.scss";
</style>
