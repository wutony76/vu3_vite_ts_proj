<script setup lang="ts">
</script>

<template>
  <nav style="
    position: absolute;
    width: 100%;
    z-index: 99;
  ">
    <router-link to="/">HOME</router-link> |
    <router-link to="/snake">SNAKE</router-link> |
    <router-link to="/splitting">SPLITTING</router-link> |
    <router-link to="/floatingMenu">FLOAT-MENU</router-link>
  </nav>
  <router-view/>
</template>