<script>
	export default {
		props: {
      identifier : {
        required : true
      },
      textCTA : {
        required : true
      },
      commentId : {
        required : false
      }
    },
    methods : {
        handleSubmit() {
          this.$emit('posted', true)
        },
        handleCancel() {
          this.$emit('posted', false)
        }
    },
	}
</script>

<template>
	<div :id="identifier" class="flex items-center justify-center">
		<span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
        </span>
    
        <!-- Links and Images -->
        <span class="ql-formats">
          <button class="ql-link"></button>
          <!-- <button class="ql-image"></button> -->
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
        <span class="ql-formats grow flex-end" style="margin-left: auto;">
            <!-- :id="ql-my-custom-button" -->
            <button style="background: #1E363E;
    color: white;
    font-weight: bold;
    width: auto;
    height: auto;
    text-align: center;
    float: right;
    padding: 8px 24px;" @click="handleSubmit">
                {{ textCTA }}
            </button>
          </span>
          <span v-if="this.commentId" class="ql-formats">
            <button style="
                color: #D21312;
                width: fit-content;
                height: fit-content;
                float: right;
                display: flex;
                justify-content: center;
                align-items: center;
                " @click="handleCancel">
                <span>Cancel</span>
            </button>
          </span>
	</div>
</template>
