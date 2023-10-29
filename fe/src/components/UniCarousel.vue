<template>
  <div id="carousel" class="h-auto">
    <Carousel :pictures="pictures" :indicators="false"></Carousel>
  </div>
</template>

<script setup>
import { Carousel } from 'flowbite-vue';

let urls = [
  "/src/assets/universities/imperial/imperial-1.jpg",
  "/src/assets/universities/imperial/imperial-2.jpeg",
  "/src/assets/universities/imperial/imperial-3.jpg",
]

let pictures = []
for (const url of urls) {
  let img = {}
  img.src = url
  pictures.push(img)
}

</script>

<style>
#default-carousel .xl\:h-80 {
  height: 27rem;
}

#default-carousel img {
  object-fit: cover;
  height: 100%;
}

#default-carousel div, #default-carousel button {
  z-index: 1;
}

</style>