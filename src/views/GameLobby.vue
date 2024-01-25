<script setup lang="ts">
import Animation from '@/logic/util/Animation'
import ArtsEffect from '@/logic/util/ArtsEffect'
import { ACTIONS } from '@/logic/util/Parameter'
import Lobby from '@/logic/lobby/Lobby'

import { nextTick, onMounted } from 'vue'
import Splitting from 'splitting'
import Nvbar from '@/components/Ui/NvbarList.vue'

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

    
    
    // Animation.addClass('logoBox', 'page--alphaIn', 500)
    setTimeout(() => {
      ArtsEffect.thickness('logoBox', 7, '#b14c4a', '#2a0303')
    }, 300)
  })
})

</script>

<template>
  <div class="gameLobby animations">
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
          <div class="list-game-block">
            <div class="game-block"></div>
            <div class="game-block"></div>
            <div class="game-block"></div>
            <div class="game-block"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/game/gameLobby.scss";
</style>
