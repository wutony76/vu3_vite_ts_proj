<script setup lang="ts">
  import { onMounted } from 'vue'
  import Splitting from 'splitting'

  onMounted (() => {
    console.log('ttt.onMounted')
    Splitting()
  })
</script>

<template>
  <div style="height: 100vh; overflow: auto;">
    <div style="height:50px;"></div>

    <div class="btn-sample">
      <div class="btn">Neon</div>
      <!-- <div class="btn">Neon</div>
      <div class="btn btn1">Neon</div>
      <div class="btn btn2">Neon</div>
      <div class="btn btn3">Neon</div> -->
    </div>

    <div class="css3d-sample">
      <div class="camera">
        <div class="space">
          <div class="box">
            RELOAD
          </div>
        </div>
      </div>

      <div class="camera2">
        <div class="space2">
          <div class="box2">
            RELOAD2
          </div>
        </div>
      </div>
    </div>

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
        <!-- 動畫測試 -->
        <div class="test-container-1">
          <div class="cub"></div>
        </div>

        <div class="test-container-2">
          <h2 class="headline self headline--self001">self-test-001</h2> <h2 data-splitting class="headline self headline--self001">self-test-001</h2> 
        </div>

      </main>

    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/css/buttonSample.scss";
  @import "../assets/css/css3dSample.scss";
  @import "../assets/css/splittingSample.scss";
</style>