<script setup lang="ts">
  import { onMounted } from 'vue'
  import Splitting from 'splitting'

  onMounted (() => {
    console.log('ttt.onMounted')
    Splitting()
  })
</script>

<template>
  <div class="splitting-sample">
    <!-- SPLITTING 範例  -->
    <h1> SPLITTING-PAGE </h1>
    <main class="container">
      <div data-splitting class="headline headline--jump">jumping</div>
      <h2 data-splitting class="headline headline--float">floating</h2>
      <h2 data-splitting class="headline headline--jog">jogging</h2>
      <h2 data-splitting class="headline headline--flip">flipping</h2>
      <h2 data-splitting class="headline headline--twirl">twirling</h2>
      <h2 data-splitting class="headline headline--fall">falling</h2>
    </main>

    <!-- CSS ACTIONS 測試  -->
    <h1 class="block"> ACTIONS-PAGE </h1>
    <main class="animation-test" >
      <div class="test-container-1">
        <div class="cub"></div>
      </div>
    </main>

  </div>
</template>

<style lang="scss">
  @import "../assets/css/splittingSample.scss"
</style>