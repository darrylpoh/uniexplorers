<template>
  <div class="discuss-card card rounded-xl bg-white flex flex-col items-start border border-darkgreen/30 hover:translate-x-2 transition-all shadow-lg text-darkgreen">
      <router-link :to="
        { name : 'uniDiscussionsThread',
          params : { thread : thread_id },
        }" class="w-full">
      <div class="titleTimestamp flex gap-2 w-fit pr-4 border-b-[1.5px] border-darkgreen mb-3">
        <h2 class="discuss-title font-bold text-lg inline">{{ title }}</h2> 
        <div class="statsTime inline-flex items-center">
          <div class="inline-flex commentsStats group gap-1 text-lg items-center rounded-lg">
            <svg class="h-6 transition-all group-hover:stroke-grey group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            {{ count }}
          </div>
<!-- 

          <span class="ml-2 opacity-50">last updated  {{ meta.latest.created ? '8 days ago' : 'yes' }}</span>
-->
        </div>
      </div>
      <!-- <div class="underline rounded mb-3"></div> -->
      
      <div class="discuss-content text-content text-sm md:text-base mb-4 w-full">
        {{ forum_text }}
        <slot></slot>
      </div>
    </router-link>


      <!-- LATEST COMMENT HERE -->
  
      <div class="meta flex justify-between items-center">

        <div class="commentLatest flex items-center gap-2 pr-12">

          <!-- TODO: ADD PROFILE IMAGE HERE -->
          <svg class="w-64 md:w-52 lg:w-40 xl:w-32 h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          
          <div class="commentTexts">
            <p class="font-semibold text-sm text-lightgrey brightness-110 inline">
              {{ meta.latest.user_email }}
            </p>
            <span class="ml-2 opacity-50 font-light text-sm"> {{ meta.latest.created ? '8 days ago' : 'yes' }}</span>
            <p class="text-sm line-clamp-2">
              {{ meta.latest.comment_text }}
            </p>
          </div>


        </div>

        <!-- <div class="commentsStats group flex gap-1 p-2 text-base items-center rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1" stroke="currentColor" class="h-7 transition-all group-hover:stroke-grey group-hover:scale-110">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          {{ meta.comments }}
        </div> -->

      </div>
    </div>
</template>

<script>
export default {
  name: "DiscussCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    forum_text : {
      type : String,
      required : true,
      default : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nobis, laborum dolores ex iste doloremque ut corporis rem in magnam exercitationem, reiciendis quaerat repellat quibusdam. Facilis est iusto ullam tenetur.'
    },
    count : {
      type : String || Number,
      default : 'Contribute!'
    },
    meta : {
      type : Object,
      required : false,
      default : {
        comments : 99,
        latest : {
          user_email : 'bobjohn',
          comment_text : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quae assumenda non minus provident expedita voluptas, officiis enim quibusdam molestias veritatis magnam voluptatem aspernatur repudiandae doloribus totam, alias unde quam?',
          created : '13 July 2023'
        }
      }
    },
    thread_id : {
      type : Number,
      required : true
    }
  },
};
</script>

<style scoped>
.discuss-card {
  padding: 1rem;
}

.underline {
  width: 30%;
  height: 1.5px;
  background-color: #1E363E;
  /* margin-bottom: 1rem; */
}
</style>
