<script setup>
import { RouterLink, RouterView } from 'vue-router'
import headerBanner from './components/headerBanner.vue';
</script>

<template>
  <div id="app" :class="{'bg-lightgreen' : $route.path != '/', 'bg-darkgreen' : $route.path == '/'}" class="overflow-auto">
    <headerBanner v-if="$route.path != '/'"/>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
