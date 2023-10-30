<template>
	<div class="ml-4 flex flex-col-reverse flex-grow">
		<input :name="name" type="hidden" v-model="content_raw">
		<quillToolbar :textCTA="textCTA" @posted="handleSubmit" :identifier="name + '-editor-toolbar'"/>
	    <div :id="name + '-editor'" style="height: 200px"></div>
	</div>
</template>

<script>
	import Quill from 'quill'
	import quillToolbar from './quillToolbar.vue'

    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            textCTA : {
                type : String,
                default : 'Post'
            },
            thread_id : {
                type : Number,
                required : true
            },
            comment_id : {
                type : Number,
            }
        },

        data() {
            return {
                editor: null,
                content_raw: this.value,
                content: this.value
            }
        },

        methods: {
			update() {
                this.content_raw = this.editor.root.innerHTML
                this.content = this.editor.getText()
            },
            handleSubmit() {

                this.$emit('posted', {
                    user_email : JSON.parse(localStorage.getItem('user')).user_data.email,
                    children : [],
                    comment_text : this.content,
                    comment_text_raw : this.content_raw,
                    created : new Date().toString(),
                    num_likes : 0,
                    num_dislikes : 0,
                })

                this.editor.root.innerHTML = ''
            }
        },

        mounted() {
		    this.editor = new Quill(`#${this.name}-editor`, {
		        modules: { toolbar: `#${this.name}-editor-toolbar` },
		        theme: 'snow',
		        placeholder: 'Write your mind...'
		    });

		    this.editor.root.innerHTML = this.value;
            this.editor.root.style.border = '1px solid #d1d5db'
            this.editor.root.style.borderBottom = 'none'
            this.editor.root.style.borderLeft = 'none'
            this.editor.root.style.borderRight = 'none'

		    // We will add the update event here
		    this.editor.on('text-change', () => this.update());
		},

		components: {quillToolbar}
    }
</script>

<style lang="css">

</style>