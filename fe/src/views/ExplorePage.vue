<script>
  import axios from 'axios';
  import uniCards from '../components/uniCards.vue';
  import exploreFilter from '../components/exploreFilter.vue';
  import textSearch from '../components/textSearch.vue';
  import { MqResponsive } from "vue3-mq";
  import { useSearchStore } from '@/stores/searchStore'

  export default {
    name: 'ExplorePage',
    setup() {
      const searchStore = useSearchStore()
      var filterKey = 0
      return { searchStore, filterKey }
    },
    mounted() {

      if (this.searchStore.searchResults.length == 0) {
        axios.get(import.meta.env.VITE_BACKEND + '/universities').then((res) => {
          this.searchStore.setSearchResults(res.data)
        }).catch((err) => {
            if (err.code == 'ERR_NETWORK') {
              this.error = "DB Not Connected..."
            }
          })
      } else {
        this.results = this.searchStore.searchResults
      }

    },
    inject: ["mq"],
    data() {
      return {
        filtered : false,
        error : "NO RESULTS :(",
        showfilter : false
      }
    },
    components : {
      uniCards,
      exploreFilter,
      textSearch,
      MqResponsive
    },
    methods : {
      toggleFilter(e) {
        this.showfilter = !this.showfilter
      },
      updateSpacer(width) {
        // console.log(width)
        document.getElementById('SPACER').style.width = `${width}px`;
      },
      queryBuilder(filters) {
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

        return query
      },
      updateResult(filters) {

        if (this.mq.smMinus) {
          this.toggleFilter()
        }
        this.filtered = true;
        var query = ''

        if (filters !== 'reset') {
          query = this.queryBuilder(filters)
        } else {
          this.filterKey++
        }

        this.searchStore.setSearchQuery(query)
        axios.get(import.meta.env.VITE_BACKEND + '/universities' + query).then((res) => {
          this.searchStore.setSearchResults(res.data)
        })
      }
    }
  }
</script>

<template>
<!-- right-[6.25%] -->

<!-- FILTER DISPLAY FOR SM SCREENS -->
<!-- @scroll.prevent -->
    <Transition name="slide">
      <div v-show="showfilter"  id="filter" class="dialogWrapper flex-col items-start pt-8" @click.self="toggleFilter">
        <!-- [calc(100%-2rem)] -->
          <div class="filtersm relative cardWhite w-full text-darkgreen grow">
            <h2 class="text-xl font-bold"> Filter & Sort </h2>
            <hr class="mb-2"/>
            <exploreFilter :key="filterKey" @filter="updateResult"/>
          </div>
      </div>
    </Transition>
<!-- FILTER DISPLAY FOR SM SCREENS -->


    <div :class="mq.smMinus ? 'flex-col items-center px-4' : 'flex-row justify-center px-8'" class="gap-4 text-darkgreen flex my-4 relative">
      <MqResponsive target="md+">
        <div style="box-shadow: rgba(30, 54, 62, 0.3) 0px 2px 4px;" id="filter" class="rounded-xl h-fit w-fit bg-white mx-2 p-4 flex flex-col gap-2">
          <exploreFilter @filter="updateResult" @filterWidth="updateSpacer"/>
        </div>
      </MqResponsive>

      <MqResponsive target="sm-" class="w-full h-10 flex items-center gap-2">
          <!-- TODO: IMPLEMENT V MODEL -->
          <textSearch/>
          <!-- <input type="text" class="relative top-2 h-full inline text-lg rounded-lg w-full pl-4 text-black " placeholder="University?" v-model="search"> -->

          <button @click="toggleFilter" class="rounded-lg text-darkgreen outline outline-1 outline-darkgreen bg-white h-full flex justify-center items-center px-2 py-1 ">
            Filter
            <svg class="inline m-auto h-6 rotate-90 ml-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/>
            </svg>
          </button>
      </MqResponsive>

      <div :class="mq.lgPlus ? 'w-auto' : 'w-full'" class="RESULTS rounded-xl flex flex-col justify-start gap-2 min-w-[50vw] min-h-[50vh]">
        
        <div class="text-lg font-bold">
          Showing {{ filtered ? searchStore.searchResults.length : `All (${searchStore.searchResults.length})` }} Results
        </div>
        <transition-group name="list"  mode="out-in" tag="div" class="flex flex-col gap-3">
            <div v-for="uni in searchStore.searchResults" v-bind:key="uni.name">
              <uniCards :uniData="uni"/>
            </div>
        </transition-group>

        <div v-if="searchStore.searchResults.length == 0" class="w-full h-full flex justify-center items-center">
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

.slide-enter-active {
  /* transition: all 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940); */
  animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.slide-leave-active {
  /* transition: all 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940); */
  animation: slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}




@keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
}


</style>