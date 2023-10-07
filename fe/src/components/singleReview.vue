<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps(['review'])
console.log(props.review)

let showmore = false
let comment = ref(props.review.comment_trunc)

function onClickShow() {
	showmore = !showmore
	comment.value = showmore ? props.review.comment : props.review.comment_trunc
}

</script>

<template>
	<div class="flex flex-row flex-wrap md:h-1/2 sm:h-full">
		<div class="xl:basis-1/6 lg:basis-1/5 md:basis-1/4 basis-full">
			<img class="w-20 h-20 mb-3 rounded-full shadow-lg" src="@/assets/profile-placeholder.jpg" alt="Bonnie image" />
		</div>
		<div class="xl:basis-5/6 lg:basis-4/5 md:basis-3/4 basis-full">
			<h3 class="font-semibold text-md">{{ review.name }}</h3>
			<h3 class="text-md">{{ review.date }}</h3>
		</div>
		<div class="lg:basis-11/12 mb-3">
			<p class="text-gray-500 text-sm md:text-md">{{ comment }}</p>
			
			<p class="mt-2 font-semibold underline underline-offset-4 text-sm md:text-md text-gray-700 cursor-pointer" v-if="!showmore" @click="onClickShow">Show More</p>
			<p class="mt-2 font-semibold underline underline-offset-4 text-sm md:text-md text-gray-700 cursor-pointer" v-else @click="onClickShow">Show Less</p>
		</div>
	</div>
</template>