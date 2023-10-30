<script>

    import { useTagsStore } from '@/stores/tagsStore'


    export default {
        name: 'tags',
        props : {
            tagName : String
        },
        inject: ['mq'],
        setup() {
            const tagsStore = useTagsStore()
            return { tagsStore }
        },
    }
</script>

<template>
<div :class="[...tagsStore.getTag(this.tagName)]" class="tag text-2xs lg:text-xs font-semibold w-fit px-4 py-1 rounded-xl">
    {{ tagName }}
</div>
</template>
