<template>
    <div class="w-full">
        <Carousel ref="carousel" v-model="currentSlide" :items-to-scroll="1" :wrap-around="true" :transition="500"
            snapAlign="start" :items-to-show="1">
            <Slide v-for="slide, index in images" :key="slide">
                <div @click="showUni(slide, index)" class="w-full h-auto">
                    <img class="w-full h-96 lg:px-28 xl:h-[500px]" :src="baseURL + slide">
                </div>
            </Slide>
            
            <Slide v-for="slide, index in fallback_images" :key="slide">
                <div @click="showUni(slide, index)" class="w-full h-auto">
                    <img class="w-full h-96 lg:px-28 xl:h-[500px]" :src="slide.src">
                </div>
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'


let currentSlide = ref(0)

const baseURL = '/src/assets/uni-images/'
const props = defineProps(['images'])
const images = props.images
if (images == undefined) {
    let fallback_images = ref([{ 'src': '/src/assets/universities/cambridge.png' }])
    console.log(fallback_images.value)
}

const showUni = (slide, index) => {
    currentSlide.value = index
}
</script>

<style>
.carousel__prev,
.carousel__next,
.carousel__prev:hover,
.carousel__next:hover {
    color: white;
}
</style>