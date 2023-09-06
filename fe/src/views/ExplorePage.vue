<script>
  import axios from 'axios';
  import uniCards from '../components/uniCards.vue';
  import exploreFilter from '../components/exploreFilter.vue';
  import { MqResponsive } from "vue3-mq";

  export default {
    name: 'ExplorePage',
    mounted() {
      axios.get(import.meta.env.VITE_BACKEND + '/universities').then((res) => {
        this.results = res.data
      }).catch((err) => {
          if (err.code == 'ERR_NETWORK') {
            this.error = "DB Not Connected..."
          }
        })
    },
    inject: ["mq"],
    data() {
      return {
        results : [],
        filtered : false,
        error : "NO RESULTS :("
      }
    },
    components : {
      uniCards,
      exploreFilter,
      MqResponsive
    },
    methods : {
      updateSpacer(width) {
        console.log(width)
        document.getElementById('SPACER').style.width = `${width}px`;
      },
      updateResult(filters) {
        // TODO: DON'T CALL DB IF NONE IS FILTERED
        // if (!Object.values(filters).every((category) => {!Boolean(category.length) || category == '4.00'})) {
        //   return;
        // }
        this.filtered = true;
        console.log(filters)
        let query = '';
        for (var category in filters) {

          switch (category) {

            case 'faculty':
              if (filters.faculty.length > 1) {
                filters.faculty.forEach(filter => {
                  query += `&faculty=${filter}`
                });
              } else if (filters.faculty.length == 1) {
                query += `&faculty=${filters.faculty[0]}`
              }
              break;
          
            case 'gpa':
              query += `?gpa=${filters.gpa}`;
              break;

            case 'continent':
              if (filters.continent.length > 1) {
                filters.continent.forEach(filter => {
                      query += `&continent=${filter}`
                    });
              } else if (filters.continent.length == 1) {
                query += `&continent=${filters.continent[0]}`
              }
              break;
          }

        }

        axios.get(import.meta.env.VITE_BACKEND + '/universities' + query).then((res) => {
          const returned = res.data.map((val, idx) => {
            return val.name
          })
          this.results = res.data;
          // this.results.forEach((ele, idx) => {
          //   if (!returned.includes(ele.name)) {
          //     console.log('not found')
          //     this.results.splice(idx, 1);
          //   }
          // })
        })
      }
    }
  }
</script>

<template>
<!-- right-[6.25%] -->
    <div :class="mq.smMinus ? 'flex-col items-center' : 'flex-row justify-center '" class="gap-4 text-darkgreen flex my-4 relative px-8">
      <MqResponsive target="md+">
        <div id="filter" class="rounded-xl h-fit w-fit bg-white outline outline-1 outline-darkgreen mx-2 p-4 flex flex-col gap-2">
          <exploreFilter @filter="updateResult" @filterWidth="updateSpacer" :filtered="filtered"/>
        </div>
      </MqResponsive>

      <MqResponsive target="sm-" class="w-full h-10 flex items-center" style="outline: red dashed 1px;">
          <!-- TODO: IMPLEMENT V MODEL -->
          <input type="text" class="relative top-2 h-9 inline text-base rounded-xl w-full pl-4 text-black" placeholder="University?" v-model="search">
          <button @click="" class="flex gap-2 bg-white text-darkgreen outline outline-1 py-1 px-3 ml-2 rounded-lg max-h-full w-fit float-left transition-all hover:scale-105 hover:outline-2 hover:outline-offset-2 active:brightness-90 active:scale-100 active:outline-offset-0">
            <span class="inline">Filter</span>
          </button>
          <button class="rounded-xl outline outline-1 outline-darkgreen bg-white h-fit flex justify-center items-center px-2 py-1 ">
            <svg class="inline m-auto h-6 rotate-90" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/>
            </svg>
          </button>
      </MqResponsive>

      <div :class="mq.lgPlus ? 'w-auto' : 'w-full'" class="RESULTS rounded-xl flex justify-center gap-2 min-w-[50vw] min-h-[50vh]">
        
        <transition-group name="list"  mode="out-in" tag="div" class="flex flex-col gap-3">
          <div class="text-lg font-bold">
            Showing {{ filtered ? results.length : `All (${results.length})` }} Results
          </div>
            <div v-for="uni in results" v-bind:key="uni.name">
              <uniCards :uniData="uni"/>
            </div>
        </transition-group>

        <div v-if="results.length == 0" class="w-full h-full flex justify-center items-center">
          <span class="text-7xl font-bold">{{ error }}</span>
        </div>
      </div>

      <div v-if="mq.mdPlus" id="SPACER" style="z-index: -1;">
      </div>
    </div>
</template>

<style scoped>

.list-enter-active, .list-leave-active {
  transition: all 0.2s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

</style>