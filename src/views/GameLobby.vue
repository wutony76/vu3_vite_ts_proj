<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Splitting from 'splitting'
import Animation from '@/logic/util/Animation'
import ArtsEffect from '@/logic/util/ArtsEffect'
import { ACTIONS, GAME, PATH } from '@/logic/util/Parameter'
import Lobby from '@/logic/lobby/Lobby'
import Nvbar from '@/components/Ui/NvbarList.vue'
const router = useRouter()

defineOptions({
  name: "GameLoddy",
  inheritAttrs: false,
})
// const state = reactive({ })

const clickListener = (actions: string) => {
  switch (actions) {
    case ACTIONS.RELOAD:
      window.location.reload()
      break

    case GAME.ELECTRONIC.SNAKE:
      changePath (PATH.SNAKE)
      break
    case GAME.ELECTRONIC.RACING:
      changePath (PATH.RACING)
      break

  }
}

onMounted(() => {
  console.log('onMounted')
  Splitting()
  new Lobby()

  nextTick(() => {
    console.log('nextTick')

    // layout
    Animation.addClass('nvbarBlock', 'animation-block-down', 10)

    // logo
    Animation.addClass('logoBox', 'page--alphaIn', 500)
    Animation.addClass('appyWord', 'headline--self001', 1500)
    Animation.addClass('yoyoWord', 'headline--self001', 2000)
    Animation.addClass('fatWord', 'page--alphaIn', 3000)
    // Animation.addClass('logoLine', 'logo-line-move', 3300)

    Animation.addClass('bannerBlock', 'animation-block-right', 700)
    Animation.addClass('contactBlock', 'animation-block-left', 1100)
    Animation.addClass('contactListBlock', 'animation-block-down', 2000)
    Animation.addClass('buttonFacebook', 'animation-scale-90-show-start', 2500)
    Animation.addClass('buttonFacebook', 'animation-scale-90-show-end', 3000)
    setTimeout(() => {
      Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
    }, 3000)

    // gamelist 
    Animation.addClass('gameListBlock', 'animation-block-up', 900)
    Animation.addClass('gameBlock1', 'animation-block-right', 1600)

    Animation.addSubClass('block1GameList', 'animation-item-intro', 2100)
    Animation.removeSubClass('block1GameList', 'animation-item-intro', 3000)
    Animation.addSubClass('block1GameList', 'alpha-1', 2900)
    
    // Animation.addClass('logoBox', 'page--alphaIn', 500)
    setTimeout(() => {
      ArtsEffect.thickness('logoBox', 7, '#b14c4a', '#2a0303')
    }, 300)
  })
})

const changePath = (target: string) => {
  Animation.addClass('lobbyContainer', 'animation-load-out', 10)
  setTimeout(() => {
    router.replace({ path: target })
    setTimeout(() => { window.location.reload() }, 10)
  }, 1300)
}

</script>

<template>
  <div class="gameLobby animations">
    <!-- <div id="loadPage" class="loadPage"></div> -->
    <div id="loadPage" class="loadPage"> </div>

    <div id="lobbyContainer" style="overflow: hidden;">
      <div id="nvbarBlock" class="nvbar">
        <div class="nvbarContainer">
          <div class="content-block">
            <div id="logoBox" class="logo">
              <div class="logoBox">
                <span class="firstWord">H</span>
                <span id="appyWord" class="appyWord self" data-splitting>APPY</span>
                <span id="fatWord" class="fatWord self" data-splitting>FAT</span>
                <span id="yoyoWord" class="yoyoWord self" data-splitting> yoyo </span>
              </div>
              <div id="logoLine" class="line1"></div>
            </div>
            <div>center</div>
            <div class="settings">
              <div class="listBox">
                <span class="item setting-text self button--float"
                  @click="clickListener(ACTIONS.RELOAD)"
                > RELOAD </span>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </div>
      </div>
      <div class="main">
        <div class="header">
          <div id="bannerBlock" class="bannerBlock">
            <div class="content-block"> banner </div>
            <span class="item setting-text"> INTRODUCE </span>
            <div class="footer"></div>
          </div>
          <!-- <div class="contactBlock">
            <div id="contactBlock" class="content-block">
              <span class="item setting-text"> CONTACT </span>
              <span id="buttonFacebook" class="item button-facebook"> FACEBOOK </span>

              <div id="contactListBlock" class="list-block">
                <span class="item button-email"> EMAIL </span>
                <span class="item button-linkedin"> LINKEDIN </span>
                <span class="item button-instagram"> INSTAGRAM </span>
                <span class="item button-line"> LINE </span>
              </div>

              <div class="header-footer"></div>
              <div class="footer"></div>
            </div>
          </div> -->
        </div>
        <div class="header-left">
          <div class="contactBlock">
            <div id="contactBlock" class="content-block">
              <span class="item setting-text"> CONTACT </span>
              <span id="buttonFacebook" class="item button-facebook"> FACEBOOK </span>

              <div id="contactListBlock" class="list-block">
                <span class="item button-email"> EMAIL </span>
                <span class="item button-linkedin"> LINKEDIN </span>
                <span class="item button-instagram"> INSTAGRAM </span>
                <span class="item button-line"> LINE </span>
              </div>

              <div class="header-footer"></div>
              <div class="footer"></div>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="nvbarBlock"> <Nvbar></Nvbar> </div>
          <div id="gameListBlock" class="gameListBlock">
            <span class="item setting-text"> GAMELIST 
              <span class="path00"></span>
              <span class="path01 title-rotate"></span>
            </span>
            <div class="footer"></div>
          </div>
          <div id="gameBlock1" class="list-block-1">
            <span class="item setting-text"> ELECTRONIC </span>
            <div id="block1GameList" class="list-game-block">
              <div style="--item-index: 4;" class="game-block ready">
                <div class="content">?</div>
              </div>
              <div style="--item-index: 3;" class="game-block ready">
                <div class="content">?</div>
              </div>
              <div style="--item-index: 2;" class="game-block ready">
                <div class="content">?</div>
              </div>

              <div style="--item-index: 1;" class="game-block game racing"
                @click="clickListener(GAME.ELECTRONIC.RACING)"
              >
                <div class="content">
                  <div class="light-1"></div>
                  <div class="light-2"></div>
                  <div class="light-3"></div>
                  <div class="auto-light-1"></div>
                </div>
                <span class="name">RACING</span>
              </div>

              <div style="--item-index: 0;" class="game-block game snake"
                @click="clickListener(GAME.ELECTRONIC.SNAKE)"
              >
                <div class="content"></div>
                <span class="name">SNAKE</span>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>

  </div>
</template>

<style lang="scss">
  @import "../assets/css/game/gameLobby.scss";
</style>
