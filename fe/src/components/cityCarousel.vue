<template>
    <div class="min-w-[1200px]">
        <p class="text-2xl">{{ area }}</p>

        <Carousel 
            ref="carousel" 
            v-model="currentSlide"
            :items-to-show="5" 
            :items-to-scroll="1"
            :wrap-around="true"
            :transition="500"
            snapAlign="start"
        >
            <Slide 
                v-for="slide, index in cities" 
                :key="slide" 
            >
            <div 
            @click="showCity(slide, index)"
            :class="
                currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white'
            "
        >
                    <img 
                        class="object-cover w-96 h-60" 
                        :src="slide.image"
                    >
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

    import { useCitiesStore } from '../stores/citiesStore'
    import { storeToRefs } from 'pinia';
    const useCity = useCitiesStore()
    const { city, showFullCity } = storeToRefs(useCity)


    let currentSlide = ref(0)

    const props = defineProps({ area: String, cities: Array })
    const { cities, area } = toRefs(props)


    const showCity = (slide, index) => {
        currentSlide.value = index
        showFullCity.value = true
        city.value = slide
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