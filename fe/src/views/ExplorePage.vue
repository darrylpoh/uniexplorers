<script>
  import { fetchWrapper } from '../helpers/fetch-wrapper';
  import uniCards from '../components/uniCards.vue';
  import exploreFilter from '../components/exploreFilter.vue';
  import textSearch from '../components/textSearch.vue';
  import { MqResponsive } from "vue3-mq";
  import { useSearchStore } from '../stores'
import { tickStep } from 'd3';

  export default {
    name: 'ExplorePage',
    setup() {
      const { getCurrentPage, navigatePage, getSearchResults } = useSearchStore()
      const searchStore = useSearchStore()

      return { getCurrentPage, navigatePage, getSearchResults, searchStore }
    },
    mounted() {
      this.updatePages()

      this.searchStore.$onAction(({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        after(async (data) => {
          if (name === 'setSearchResults') {

            const totalRes = data.length
            if (totalRes == 0) {
              this.error = 'No Results Found'
              this.totalPages = 0
              this.navPageExplore('reset')
            } else {
              this.totalPages = Math.ceil(totalRes / this.MAX_CARDS)
              this.navPageExplore(-this.currentPage + 1)
            }
            this.updatePages()
          }
        })
      })
    },
    inject: ["mq"],
    data() {
      return {
        filtered : false,
        error : "",
        showfilter : false,
        loading : true,
        currentPage : this.getCurrentPage,
        nearbyPages : [],
        displayedResults : [],
        MAX_CARDS : 6,
        totalPages : 1
      }
    },
    components : {
      uniCards,
      exploreFilter,
      textSearch,
      MqResponsive
    },
    methods : {
      async updatePages(reset) {
        var pages = []
        var toShow = []

        if (reset != 'reset') {
          toShow = await this.getSearchResults()
          this.totalPages = Math.ceil(toShow.length / this.MAX_CARDS)
        }
        
        if (this.totalPages <= 5) {
          for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          const startPage = Math.max(1, this.currentPage - 2);
          const endPage = Math.min(this.totalPages, startPage + 4);
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }
        }

        var startIdx = (this.currentPage - 1) * this.MAX_CARDS
        this.displayedResults = toShow.slice(startIdx, startIdx + this.MAX_CARDS)
        this.nearbyPages = pages
      },
      navPageExplore(shift) {
        if (shift === 'reset') {
          return this.navigatePage('reset')
        }

        if ((this.currentPage == this.totalPages && shift > 0) || (this.currentPage == 1 && shift < 0)) {
          return
        }
        this.currentPage += shift
        this.updatePages()
        return this.navigatePage(shift)
      },
      toggleFilter(e) {
        this.showfilter = !this.showfilter
      },
      updateSpacer(width) {
        document.getElementById('SPACER').style.width = `${width}px`;
      },
      queryBuilder(filters) {
        let query = '';
        for (var category in filters) {

          switch (category) {

            case 'tag':
              if (filters.tag.length > 1) {
                filters.tag.forEach(filter => {
                  query += `&tag=${filter}`
                });
              } else if (filters.tag.length == 1) {
                query += `&tag=${filters.tag[0]}`
              }
              break;
          
            case 'gpa':
              query += `?gpa=${filters.gpa}`;
              break;

            case 'continent':
              if (filters.continent.length > 1) {
                filters.continent.forEach(filter => {
                      query += `&continent=${filter}`
                    })
              } else if (filters.continent.length == 1) {
                query += `&continent=${filters.continent[0]}`
              }
              break;
          }

        }

        return query
      },
      async updateResult(filters) {
        this.loading = !this.loading
        if (this.mq.smMinus) {
          this.toggleFilter()
        }
        this.filtered = true;
        var query = ''

        if (filters !== 'reset') {
          query = this.queryBuilder(filters)
        } else {
          query = 'reset'
        }

        await this.getSearchResults(query).then(
          async data => {
            console.log('response from query', data);
            const totalRes = data.length
            if (totalRes == 0) {
              this.error = 'No Results Found'
              this.totalPages = 0
              this.navPageExplore('reset')
              await this.updatePages('reset')
            } else {
              this.totalPages = Math.ceil(totalRes / this.MAX_CARDS)
              this.navPageExplore(-this.currentPage + 1)
              await this.updatePages()
            }
          }
        ).finally(() => {
          this.loading = !this.loading
        })
      }

    }
  }
</script>

<template>
<!-- right-[6.25%] -->

<!-- FILTER DISPLAY FOR SM SCREENS -->
    <Transition name="slide">
      <div v-if="mq.smMinus" v-show="showfilter"  id="filter" class="dialogWrapper flex-col items-start pt-8" @click.self="toggleFilter">
        <!-- [calc(100%-2rem)] -->
          <div class="filtersm relative card bg-white w-full text-darkgreen grow">
            <h2 class="text-xl font-bold"> Filter & Sort </h2>
            <hr class="mb-2"/>
            <exploreFilter :key="$uuid()" @filter="updateResult"/>
          </div>
      </div>
    </Transition>
<!-- FILTER DISPLAY FOR SM SCREENS -->

    <div :class="mq.smMinus ? 'flex-col items-center px-4' : 'flex-row justify-center px-8'" class="gap-4 text-darkgreen flex my-4 relative">
      <MqResponsive target="md+">
        <div style="box-shadow: rgba(30, 54, 62, 0.3) 0px 2px 4px;" id="filter" class="rounded-xl h-fit w-auto bg-white mx-2 p-2 lg:p-4 flex flex-col gap-2">
          <exploreFilter :key="$uuid()" @filter="updateResult" @filterWidth="updateSpacer"/>
        </div>
      </MqResponsive>

<!-- FILTER DISPLAY FOR SM SCREENS -->
      <MqResponsive target="sm-" class="w-full h-10 flex items-center gap-2">
          <textSearch/>
          <button @click="toggleFilter" class="rounded-lg text-darkgreen outline outline-1 outline-darkgreen bg-white h-full flex justify-center items-center px-2 py-1 ">
            Filter
            <svg class="inline m-auto h-6 rotate-90 ml-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/>
            </svg>
          </button>
      </MqResponsive>
<!-- FILTER DISPLAY FOR SM SCREENS -->

      <div :class="mq.lgPlus ? 'w-auto' : 'w-full'" class="RESULTS rounded-xl flex flex-col justify-start gap-2 min-w-[50vw] min-h-[50vh]">
        
        <div class="text-lg font-bold h-8">
          <!-- Showing {{ filtered ? totalResults : `All (${totalResults})` }} Results -->
          <div class="pagination select-none flex gap-2 h-full items-center">
            <div :class="{'opacity-30' : currentPage === 1}" class="nav w-8 h-8 flex items-center" @click="navPageExplore(-1)" :disabled="currentPage === 1">
              <img src="/vectors/caret.svg" class="min-h-full min-w-full rotate-180" alt="">
            </div>
            <div
              v-for="page in nearbyPages"
              :key="page"
              @click="navPageExplore(page - currentPage)"
              class="text-content rounded cursor-pointer px-2 select-none"
              :class="{ 'bg-darkgreen text-white shadow-md border border-white ': currentPage === page }"
            >
              {{ page }}
            </div>
            <div :class="{'opacity-30' : currentPage === totalPages}" class="nav w-8 h-8 flex items-center" @click="navPageExplore(1)" :disabled="currentPage === totalPages">
              <img src="/vectors/caret.svg" class="min-h-full min-w-full" alt="">
            </div>
          </div>


        </div>

        <div class="wrapper">
          <!-- <transition-group name="list"  mode="out-in" tag="div" class="flex flex-col gap-3"> -->
              <div class="flex flex-col gap-3" >
                <uniCards v-for="uni in displayedResults" v-bind:key="uni.name" :uniData="uni"/>
              </div>
          <!-- </transition-group> -->
        </div>

        <div v-if="displayedResults.length == 0" class="w-full h-full flex justify-center items-center">
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