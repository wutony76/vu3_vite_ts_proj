<script setup lang="ts">
import Animation from '@/logic/util/Animation'
import ArtsEffect from '@/logic/util/ArtsEffect'

import { nextTick, onMounted } from 'vue'

defineOptions({
  name: "GameLoddy",
  inheritAttrs: false,
})
// const state = reactive({ })

onMounted(() => {
  console.log('onMounted')
  // Splitting()

  nextTick(() => {
    console.log('nextTick')

    // layout
    Animation.addClass('nvbarBlock', 'animation-down', 10)

    // logo
    // ArtsEffect.thickness('logoBox', 7, '#b14c4a', '#2a0303')

  })
})

</script>

<template>
  <div class="gameLobby animations">
    <div id="nvbarBlock" class="nvbar">
      <div class="nvbarContainer">
        <div class="content-block">

          <div class="logo">
            <div id="logoBox" class="logoBox">
              <span class="firstWord">H</span>
              <span class="appyWord">APPY</span>
              <span class="fatWord">FAT</span>
              <span class="yoyoWord"> yoyo </span>
            </div>
            <div class="line1"></div>
          </div>
          <div class="logo1">LOGO</div>
          <div class="logo2">LOGO</div>

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
