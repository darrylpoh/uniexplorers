<script>

  import { MqResponsive } from "vue3-mq";
  import axios from 'axios'
  import { useSearchStore } from '@/stores/searchStore'

  export default {
    name: 'headerBanner',
    components : {
      MqResponsive
    },
    data() {
      return {
        search : '',
        results : [],
        debounceTimeout : null,
        showResults : false,
        searched : false
      }
    },
    methods : {
      goToResult(name) {
        this.results = []
        this.$router.push('uni/' + name.replaceAll(' ', '-').toLowerCase())
      },
      goToProfile() {
        this.$router.push('/profilepage')
      },
      goToHome() {
        this.$router.push('/explore')
      },
      debouncedSearch() {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
          this.performSearch();
        }, 500)
      },
      performSearch(enter = false) {
        const searchStore = useSearchStore()

        if (this.search.trim() === '') {
          this.results = [];
          this.showResults = false
          this.searched = false
          return
        }

        axios.get( import.meta.env.VITE_BACKEND + '/universities/search/' + this.search)
          .then(res => {
            
            if (enter) {
              searchStore.setSearchResults(res.data)
              this.showResults = false
            } else {
              this.showResults = true
            }
            
            this.results = res.data
          })
          .catch(error => {
            console.error('Error:', error);
        })

        this.searched = true
      },
      updateExplorePage() {
        return this.performSearch(true)
      }
    },
    inject : ['mq']
  }
</script>

<template>
  <div :class="mq.mdPlus ? 'px-16' : (mq.smPlus ? 'px-8' : '')" class="z-10 head sticky w-screen bg-darkgreen h-20 flex items-center justify-around border-0 border-b-2 border-gray-500">
    <div class="logo w-1/3 overflow-visible">
      <img @click="goToHome" src="/Light Logo.png" :class="mq.lgPlus ? 'h-20' : 'h-16'" class="left-1/4 cursor-pointer transition-all" title="Back to Home">
    </div>
    
    <div v-if="mq.smPlus" :class="mq.smPlus ? 'w-1/3' : 'w-1/2'" class="searchBar relative h-1/2 z-10">
      <div class="wrapper">
        <input @input="debouncedSearch" @keydown.enter="updateExplorePage" @blur="showResults = false" @focus="showResults = true" type="text" class="relative rounded-xl w-full h-full pl-4 text-black" placeholder="University?" v-model="search" >
        <div class="searchIcon w-auto h-full px-2 absolute flex items-center right-0 top-0 cursor-pointer hover:scale-110">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929L20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill="black"/>
          </svg>
        </div>
      </div>

      <div v-if="searched && showResults" class="wrapper h-auto cardWhite overflow-hidden shadow-md rounded-t-none">
        <div v-if="results.length > 0" v-for="result, idx in results" @click="goToResult(result.name)" class="relative shadow-inner w-full min-h-16 py-2 hover:bg-gray-100 hover:cursor-pointer active:border active:border-darkgreen transition-all duration-75" :class="[idx != results.length - 1 ? 'border-b border-lightgray' : '']">
          <h2 class="text-darkgreen pl-4 text-lg font-medium text-left">{{result.name}}</h2>
          
          <div class="text-sm w-full flex flex-row my-2 mx-4 text-lightgrey">
            <div class="location font-medium flex-1 items-center">
                <svg :class="mq.lgPlus ? 'w-3 mr-2' : 'w-2.5 mr-1.5'" class="inline scale-[0.8] relative bottom-0.5" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.47143 0 0 4.5385 0 10.15C0 12.673 0.714285 15.0365 2.01429 17.168C3.37143 19.401 5.15714 21.315 6.52857 23.548C7.2 24.6355 7.68571 25.6505 8.2 26.825C8.57143 27.6225 8.87143 29 10 29C11.1286 29 11.4286 27.6225 11.7857 26.825C12.3143 25.6505 12.7857 24.6355 13.4571 23.548C14.8286 21.3295 16.6143 19.4155 17.9714 17.168C19.2857 15.0365 20 12.673 20 10.15C20 4.5385 15.5286 0 10 0ZM10 14.1375C8.02857 14.1375 6.42857 12.5135 6.42857 10.5125C6.42857 8.5115 8.02857 6.8875 10 6.8875C11.9714 6.8875 13.5714 8.5115 13.5714 10.5125C13.5714 12.5135 11.9714 14.1375 10 14.1375Z" fill="#1E363E"/>
                </svg>
                {{ result.location }}
            </div>
            <div class="gpa font-medium flex-1 items-center min-w-fit">
                <svg :class="mq.lgPlus ? 'w-6 mx-2' : 'w-4 scale-105 mr-1.5'" class="inline scale-[0.8] relative" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.36364 16.4011V22.8456L17.5 29L28.6364 22.8456V16.4011L17.5 22.5556L6.36364 16.4011ZM17.5 0L0 9.66667L17.5 19.3333L31.8182 11.4228V22.5556H35V9.66667L17.5 0Z" fill="black"/>
                </svg>
                {{ result.gpa }} GPA
            </div>
            <div class="time font-medium flex-1 items-center min-w-fit mr-4">
                <svg :class="mq.lgPlus ? 'w-5 mx-2' : 'w-3.5 scale-105 mr-1.5'" class="inline scale-[0.8] relative" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z" fill="black"/>
                </svg>
                1 Semester
            </div>
          </div>
        </div>

        <div v-else>
          <h2 class="text-darkgreen text-lg font-bold text-center my-2 opacity-50">No Results Found</h2>
        </div>
      </div>
    </div>

    <div class="links flex w-1/3 h-9 justify-end">
      <button class="exploreCities bg-[#FFFFFF] rounded-lg h-full w-fit flex items-center px-4 py-2 outline outline-2 outline-lightgrey hover:brightness-90 hover:outline-lightgreen hover:outline-offset-2 hover:scale-105 transition-all active:scale-100 active:outline-offset-0">
        <p class="text-darkgreen m-0 p-0 text-base">{{ mq.lgPlus ? 'Explore' : ''}} Cities</p>
      </button>
      <button @click="goToProfile" class="flex items-center ml-4 rounded-lg outline outline-2 outline-darkgreen hover:outline-lightgreen transition-all">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.6673 6.3327C26.5509 3.21639 22.4072 1.5 18 1.5C13.5928 1.5 9.44913 3.21632 6.3327 6.3327C3.21639 9.44913 1.5 13.5928 1.5 18C1.5 22.4072 3.21632 26.5509 6.3327 29.6673C9.44913 32.7836 13.5928 34.5 18 34.5C22.4072 34.5 26.5509 32.7837 29.6673 29.6673C32.7836 26.5509 34.5 22.4072 34.5 18C34.5 13.5928 32.7837 9.44913 29.6673 6.3327ZM8.66107 29.1695C9.20595 24.4815 13.2365 20.8622 18 20.8622C20.5111 20.8622 22.8725 21.8405 24.6487 23.6165C26.1493 25.1173 27.0957 27.0768 27.3391 29.1693C24.8089 31.2884 21.551 32.5664 18 32.5664C14.449 32.5664 11.1914 31.2887 8.66107 29.1695ZM18 18.8706C15.2368 18.8706 12.9885 16.6223 12.9885 13.8591C12.9885 11.0957 15.2369 8.84766 18 8.84766C20.7631 8.84766 23.0115 11.0957 23.0115 13.8591C23.0115 16.6223 20.7632 18.8706 18 18.8706V18.8706ZM29.0034 27.5348C28.5066 25.5342 27.4737 23.7068 26.0158 22.2494C24.8275 21.061 23.4216 20.1695 21.8883 19.6108C23.7316 18.3608 24.9451 16.2489 24.9451 13.8591C24.9451 10.0297 21.8294 6.91406 18 6.91406C14.1706 6.91406 11.0549 10.0297 11.0549 13.8591C11.0549 16.2502 12.2695 18.3628 14.1142 19.6126C12.7035 20.1267 11.3981 20.9215 10.275 21.9679C8.6485 23.4825 7.51908 25.4139 6.9954 27.5333C4.77757 24.9765 3.43359 21.6424 3.43359 18C3.43359 9.96805 9.96805 3.43359 18 3.43359C26.032 3.43359 32.5664 9.96805 32.5664 18C32.5664 21.6431 31.2219 24.9781 29.0034 27.5348Z" fill="white"/>
        </svg>
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