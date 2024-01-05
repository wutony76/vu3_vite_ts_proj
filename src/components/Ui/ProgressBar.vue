<script setup lang="ts">
  import { defineProps, onMounted, reactive, ref } from 'vue'
  import { UI } from '@/logic/util/Parameter'

  const props = defineProps({
    color: {
      type: String,
      default: '#00ff00',
    },
    value: {
      type: Number,
      default: -1,
    },
  })
  const state = reactive({
    minValue: 0,
    mxnValue: 100,
    defaultValue: 50,
    value: 50,
  })

  if (props.value === -1) state.value = state.defaultValue
  else state.value = props.value

  const clickListener = (actions) => {
    console.log('UI.CLICK', actions)
    switch(actions) {
      case UI.CLICKLEFT:
        state.value -= 10
        if (state.value <= state.minValue) state.value = state.minValue 
        refreshUi()
        break
      case UI.CLICKRIGHT:
        state.value += 10;
        if (state.value >= state.mxnValue) state.value = state.mxnValue 
        refreshUi()
        break
    }
  }

  const refreshUi = () => {
    fill.value.style.width = state.value + "%";
  }

  const fill = ref(null)
  const render = () => {
    // var currNum = 0;
    // var interval = setInterval(function () {
    //   currNum++
    //   fill.value.style.width = currNum + "%";
    //   if (currNum === props.value) clearInterval(interval)
    // }, 50)
    // fill.value.style.width = state.value + "%";
    refreshUi()
  }

  onMounted(() => {
    setTimeout(() => {
      render()
    })
  })
</script>

<template>
  <div class="brogress-box">
    <div class="left-btn" @click="clickListener(UI.CLICKLEFT)"> ◀ </div>
    <div class="progress-bar">
      <div class="progress-fill" ref="fill"
        :style="[{ 'background-color': props.color }]"></div>
    </div>
    <div class="right-btn" @click="clickListener(UI.CLICKRIGHT)"> ► </div>
  </div>
</template>

<style lang="scss" scoped>
  .brogress-box {
    width: 100%;
    margin-left: 15px;

    display:flex;
    align-items: center;

    .progress-bar {
      height: 30px;
      width: 100%;
      border: 1px solid #00ff00;
      border-radius: 3px;
      background: #002d00cc;
    }

    .progress-fill {
      height: 100%;
      background: #00ff00;
    }
    .left-btn {
      margin-right:10px;
      cursor:pointer;
    }
    .right-btn {
      margin-left:10px;
      cursor:pointer;
    }

  }

</style>
