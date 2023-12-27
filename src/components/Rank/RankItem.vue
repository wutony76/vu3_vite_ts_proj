<script setup lang="ts">
  import { onMounted } from 'vue'
  import Splitting from 'splitting'

  defineProps<{
    rank: string,
    name: string, 
    score: string, 
    tiemout: 100
  }>()

  onMounted(() => {
    Splitting()
  })

</script>

<template>
  <div class="ranking-block">
    <div class="rank"> {{ rank }} </div>
    <div class="name" data-splitting> {{ name }} </div>
    <div class="score"> {{ score }} </div>
  </div>
</template>

<style scoped>
</style>
