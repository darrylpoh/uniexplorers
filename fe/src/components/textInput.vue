<script>

    export default {
        name: 'textInputQuill',
        setup() {

        },
        components : {

        },
        data() {
            return {
                textContent : ''
            }
        },
        props : {

        },
        methods : {
            handleSubmit() {
                console.log(this.textContent)
                console.log('SBMITTED')
            }
        }
    }
</script>

<template>

<div class="ml-4 flex flex-col-reverse flex-grow">
    <QuillEditor v-model:content="textContent" theme="snow" style="border: 1px solid #d1d5db; border-bottom: none;" toolbar="#my-toolbar">
    
    <template #toolbar>
      <div id="my-toolbar" style="display: flex; align-items: center;">
        <!-- Basic Formatting -->
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
        </span>
    
        <!-- Links and Images -->
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
        </span>
    
        <!-- Lists -->
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
    
        <!-- Clean Format -->
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
    
        <!-- Include the custom button you defined earlier -->
        <span class="ql-formats" style="margin-left: auto;">
            <button id="ql-my-custom-button" @click="handleSubmit">
                Post!
            </button>
        </span>
      </div>
    </template>
    </QuillEditor>
</div>
</template>

<style scoped>
#ql-my-custom-button {
    background: #1E363E;
    color: white;
    width: auto;
    height: auto;
    text-align: center;
    float: right;
    padding: 8px 16px;
}



</style>