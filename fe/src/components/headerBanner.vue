<script>

  import { MqResponsive } from "vue3-mq";
  import { fetchWrapper } from "../helpers/fetch-wrapper";
  import { useCacheStore, useAuthStore } from '../stores';
  import textSearch from "./textSearch.vue";

  export default {
    name: 'headerBanner',
    components : {
      MqResponsive,
      textSearch
    },
    data() {
      return {
        yourImg : null
      }
    },
    async mounted() {
      const { user } = useAuthStore()
      const { getImg } = useCacheStore()
      this.yourImg = await getImg(user.user_data.image_filename)
    },
    methods : {
      goToCities() {
        this.$router.push('/explorecitiespage')
      },
      goToProfile() {
        this.$router.push('/profile/:handle')
      },
      goToHome() {
        this.$router.push('/explore')
      },
    },
    inject : ['mq']
  }
</script>

<template>
  <div :class="mq.mdPlus ? 'px-16' : (mq.smPlus ? 'px-8' : '')" class="z-50 sticky top-0 w-screen bg-darkgreen h-20 flex items-center justify-around border-0 border-b-2 border-gray-500">
    <div class="logo w-1/6 lg:w-1/4 overflow-visible">
      <img @click="goToHome" src="./LightLogo.png" :class="mq.lgPlus ? 'h-16' : 'h-12'" class="left-1/4 cursor-pointer transition-all" title="Back to Home">
    </div>
    
    <div class="hidden md:block searchBar relative h-10 z-50 flex-grow">
      <textSearch/>
    </div>

    <div class="links flex w-1/3 h-9 justify-end">
      <button class="exploreCities bg-[#FFFFFF] rounded-lg h-full w-fit flex items-center px-4 py-2 outline outline-2 outline-lightgrey hover:brightness-90 hover:outline-lightgreen hover:outline-offset-2 hover:scale-105 transition-all active:scale-100 active:outline-offset-0" @click="goToCities">
        <p class="text-darkgreen m-0 p-0 text-base">{{ mq.xlPlus ? 'Explore' : ''}} Cities</p>
      </button>
      <button @click="goToProfile" class="flex items-center px-2 ml-2 rounded-lg border border-2 border-darkgreen hover:border-lightgreen transition-all">

        <div class="w-8 h-8 flex justify-center items-center overflow-hidden">
          <img :src="yourImg" class="max-h-full max-w-full object-cover" alt="">
        </div>
        <!-- <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.6673 6.3327C26.5509 3.21639 22.4072 1.5 18 1.5C13.5928 1.5 9.44913 3.21632 6.3327 6.3327C3.21639 9.44913 1.5 13.5928 1.5 18C1.5 22.4072 3.21632 26.5509 6.3327 29.6673C9.44913 32.7836 13.5928 34.5 18 34.5C22.4072 34.5 26.5509 32.7837 29.6673 29.6673C32.7836 26.5509 34.5 22.4072 34.5 18C34.5 13.5928 32.7837 9.44913 29.6673 6.3327ZM8.66107 29.1695C9.20595 24.4815 13.2365 20.8622 18 20.8622C20.5111 20.8622 22.8725 21.8405 24.6487 23.6165C26.1493 25.1173 27.0957 27.0768 27.3391 29.1693C24.8089 31.2884 21.551 32.5664 18 32.5664C14.449 32.5664 11.1914 31.2887 8.66107 29.1695ZM18 18.8706C15.2368 18.8706 12.9885 16.6223 12.9885 13.8591C12.9885 11.0957 15.2369 8.84766 18 8.84766C20.7631 8.84766 23.0115 11.0957 23.0115 13.8591C23.0115 16.6223 20.7632 18.8706 18 18.8706V18.8706ZM29.0034 27.5348C28.5066 25.5342 27.4737 23.7068 26.0158 22.2494C24.8275 21.061 23.4216 20.1695 21.8883 19.6108C23.7316 18.3608 24.9451 16.2489 24.9451 13.8591C24.9451 10.0297 21.8294 6.91406 18 6.91406C14.1706 6.91406 11.0549 10.0297 11.0549 13.8591C11.0549 16.2502 12.2695 18.3628 14.1142 19.6126C12.7035 20.1267 11.3981 20.9215 10.275 21.9679C8.6485 23.4825 7.51908 25.4139 6.9954 27.5333C4.77757 24.9765 3.43359 21.6424 3.43359 18C3.43359 9.96805 9.96805 3.43359 18 3.43359C26.032 3.43359 32.5664 9.96805 32.5664 18C32.5664 21.6431 31.2219 24.9781 29.0034 27.5348Z" fill="white"/>
        </svg> -->
        <MqResponsive target="lg+">
          <p style="color: white;" class="px-2 text-lg">Profile</p>
        </MqResponsive>
      </button>
    </div>
  </div>
</template>

<style scoped>

p {
  color: black;
  text-align: center;
  font-weight: 500;
}
</style>