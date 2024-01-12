<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const clickListener = (urlName: string) => {
  switch (urlName) {
    case 'reload':
      setTimeout(() => {
        window.location.reload()
      }, 10)
      break
    case 'snake':
      router.replace({ path: "/snake" })
      setTimeout(() => {
        window.location.reload()
      }, 10)
      break
  }
}
</script>

<template>
  <nav style="
    position: absolute;
    width: 100%;
    z-index: 99;
  ">
    <router-link to="/">HOME</router-link> |
    <router-link to="/lobby" @click="clickListener('reload')"> LOBBY </router-link> |
    <router-link to="/snake" @click="clickListener('reload')"> SNAKE </router-link> |
    <router-link to="/splitting">SPLITTING</router-link> |
    <router-link to="/floatingMenu">FLOAT-MENU</router-link>
  </nav>

</template>
