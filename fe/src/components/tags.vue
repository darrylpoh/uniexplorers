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
        computed : {
            backgroundColor() {
                return 'bg-' + this.tagsStore.tags[this.tagName].background
            },
            fontColor() {
                return 'text-' + this.tagsStore.tags[this.tagName].font
            }
        }
    }
</script>

<template>
<div :class="[backgroundColor, fontColor]" class="tag text-2xs lg:text-xs font-semibold w-fit px-4 py-1 rounded-xl">
    {{ tagName }}
</div>
</template>
