<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  defineProps<{ msg: string }>()
  const count = ref(0)

  // function
  function testHi(params: string) {
    return params 
  }
  console.log(testHi('HELLO HI!!!'))

  // boolean 
  const createdByBoolean = Boolean('');
  console.log('createdByBoolean', createdByBoolean)

  // array
  const fibonacci: number[] = [1, 1, 2, 3, 5];
  console.log('fibonacci', fibonacci)
  
  interface interArray {
    [index: number]: number
  }
  const fibonacci2: interArray = [1, 1, 2, 3, 5];
  console.log('fibonacci2', fibonacci2)

  const list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
  console.log('list', list)

  // sum 
  function sum(n1:number, n2: number):number {
    return n1 + n2
  }
  console.log('sum', sum(2, 3))

</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
