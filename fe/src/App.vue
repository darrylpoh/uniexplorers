<script setup>
import { RouterLink, RouterView } from 'vue-router'
import headerBanner from './components/headerBanner.vue';
import myFooter from './components/myFooter.vue';
</script>

<template>
  <div id="app" :class="{'bg-lightgreen' : $route.path != '/', 'bg-darkgreen' : $route.path == '/'}">
    <headerBanner v-if="$route.path != '/'"/>
    <div class="wrapper min-h-screen">
      <RouterView />
    </div>
    <myFooter />
  </div>
</template>

<style scoped>
</style>
