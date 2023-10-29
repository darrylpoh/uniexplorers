<script>
	export default {
		props: {
      identifier : {
        required : true
      },
      textCTA : {
        required : true
      }
    },
        methods : {
            handleSubmit() {
                // all's g
                console.log(this.textContent)
                console.log('SBMITTED')
                this.$emit('posted', true)
            }
        },
	}
</script>

<template>
	<div :id="identifier">
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
            <!-- :id="ql-my-custom-button" -->
            <button style="background: #1E363E;
    color: white;
    width: auto;
    height: auto;
    text-align: center;
    float: right;
    padding: 8px 16px;" @click="handleSubmit">
                {{ textCTA }}
            </button>
        </span>
	</div>
</template>
