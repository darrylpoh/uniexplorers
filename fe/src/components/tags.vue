<script>

    // import

    export default {
        name: 'tags',
        props : {
            tagName : String
        },
        inject: ['mq']
    }
</script>

<template>
    <!-- TODO: Should there be short forms for the tags?  -->
<div :class="mq.lgPlus ? '' : 'origin-left scale-[75%]'" class="tag text-xs font-semibold bg-redtw text-white w-fit px-4 py-1 rounded-xl">
    Information Systems
</div>
</template>

<style scoped>

</style>