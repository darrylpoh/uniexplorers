<template>
  <div class="overflow-y-auto">
    <!-- If city is not clicked -->
    <div v-if="!showFullCity">
      <div class="absolute z-0 w-full h-[700px]">
        <CityDetails v-if="city" :city="city" />
      </div>
    </div>
    <!-- If city is clicked -->
    <div v-else>
      <div class="absolute z-0 w-full h-[700px]">
        <CityDetails v-if="city" :city="city" />
      </div>
    </div>
    <!-- Carousels -->
    <div class="absolute w-full z-20 mt-[650px]">
      <CityCarousel class="pb-14" area="Europe" :cities="cities[0]" />
      <CityCarousel class="pb-14" area="Asia/Oceania" :cities="cities[1]" />
      <CityCarousel  area="USA" :cities="cities[2]" />
    </div>
    <!-- Black Gradient -->
    <div class="mt-60 absolute z-10 h-[100%] w-[100%] bg-gradient-to-t from-black via-black" />
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel';
import { onMounted, ref } from 'vue';
import cities from '../cities.json';
import CityDetails from '../components/cityDetails.vue'
import CityCarousel from '../components/cityCarousel.vue'; 

import { useCitiesStore } from '../stores/citiesStore'
import { storeToRefs } from 'pinia';
const useCity = useCitiesStore()
const { city, showFullCity } = storeToRefs(useCity)

onMounted(() => {
  setTimeout(() => city.value = cities[0][0], 100)
})


</script>

<style>
  body {
    background-color: black;
  }
</style>