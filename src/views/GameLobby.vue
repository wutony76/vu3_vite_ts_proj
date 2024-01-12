<script setup lang="ts">
import Animation from '@/logic/util/Animation'
import ArtsEffect from '@/logic/util/ArtsEffect'

import { nextTick, onMounted } from 'vue'
import Splitting from 'splitting'

defineOptions({
  name: "GameLoddy",
  inheritAttrs: false,
})
// const state = reactive({ })

onMounted(() => {
  console.log('onMounted')
  Splitting()

  nextTick(() => {
    console.log('nextTick')

    // layout
    Animation.addClass('nvbarBlock', 'animation-down', 10)

    // logo
    Animation.addClass('logoBox', 'page--alphaIn', 500)
    Animation.addClass('appyWord', 'headline--self001', 1000)
    Animation.addClass('yoyoWord', 'headline--self001', 1500)
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
              <span id="appyWord" class="appyWord headline self" data-splitting>APPY</span>
              <span class="fatWord">FAT</span>
              <span id="yoyoWord" class="yoyoWord headline self" data-splitting> yoyo </span>
            </div>
            <div class="line1"></div>
          </div>

          <div class="settings">
            <div class="listBox">
              <span class="item"> settings </span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="main"></div>
    <div class="footer"></div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/game/gameLobby.scss";
</style>
