<script setup lang="ts">
import { nextTick, onMounted } from 'vue'

defineOptions({
  name: "GameLottery",
  inheritAttrs: false,
})

onMounted(() => {
  console.log('onMounted')

  nextTick(() => {
    console.log('nextTick')
  })
})
</script>

<template>
  <div class="gameLobby game-lottery animations">
    GAME-LOTTERY
    <div id="main">

      <div id="gameSnake" class="gameSnake-container">
        <div class="game-center">
          <div class="gameHeader">
            <!-- left-block -->
            <!-- <div class="left-block">
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
            </div> -->

            <!-- right-block -->
            <!-- <div class="right-block">
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
                      :class="[state.controlStatus === ACTIONS.CONTROLSUP ? 'isSelect' : '']"
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
            </div> -->
          </div>

          <div class="title-block">
            <h1 id="gameTitleAnim" class="headline self" data-splitting> LOTTERY </h1>
          </div>

          <div class="status-block">
            <h5 id="gameTitleAnim2">
              <!-- {{ state.showStatus }} -->
            </h5>
          </div>

          <!--创建游戏的主容器  -->
          <div id="main">
          </div>

          <div class="footer"> SNAKE.GAME @ 2023.12 </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/gameLottery/lottery.scss";
</style>
