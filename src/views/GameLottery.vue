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

    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/gameLottery/lottery.scss";
</style>
