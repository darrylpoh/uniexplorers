<script>
import axios from 'axios'
import MyFooter from '../components/myFooter.vue'
import SingleReview from '../components/singleReview.vue'
import CtaBanner from '../components/ctaBanner.vue'
import UniCarousel from '../components/UniCarousel.vue'
import ReviewModal from '../components/ReviewModal.vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import NearbyPlaceTab from '../components/NearbyPlaceTab.vue'

export default {
  components: {
    MyFooter,
    SingleReview,
    CtaBanner,
    UniCarousel,
    ReviewModal,
    GoogleMap,
    Marker,
    NearbyPlaceTab
  },
  data() {
    return {
      GOOGLE_MAP_API_KEY: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      activeTab: null,
      city: {},
      selectedPlace: null, // Add a selectedPlace data property
      value: null, // Initialize value for the select input
      data: {}, // Initialize data as an empty object
      selectedPlaceType: null
    }
  },
  async beforeMount() {
    this.city.name = 'London'

    await this.getCoordinates()

    var places_dict = {
      atm: 'atm',
      bakery: 'bread',
      convenience_store: 'convenience store',
      doctor: 'clinic',
      lodging: 'hotels',
      park: 'park',
      restaurant: 'food',
      supermarket: 'groceries',
      tourist_attraction: 'attractions'
    }

    this.data = {}

    for (let place in places_dict) {
      this.data[place] = await this.fetchData(place)
    }
    console.log(this.data)

    for (let i = 0; i < this.reviews.length; i++) {
      this.reviews[i].comment_trunc = this.truncate(this.reviews[i].comment, 40)
    }

    this.columns = ['Name', 'Rating', 'Total Ratings']
    this.width = 400
    this.height = 400
  },
  methods: {
    truncate(text, length, clamp) {
      clamp = clamp || '...'
      let words = text.split(' ')
      return words.length > length ? words.slice(0, length).join(' ') + clamp : text
    },
    async getCoordinates() {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.city.name}&key=${this.GOOGLE_MAP_API_KEY}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (data.results.length > 0) {
        this.latitude = data.results[0].geometry.location.lat
        this.longitude = data.results[0].geometry.location.lng
        this.center = { lat: this.latitude, lng: this.longitude }
      } else {
        this.latitude = null
        this.longitude = null
        console.log('Unable to get coordinates.')
      }
    },

    async fetchData(placeType) {
      const mapping = {
        restaurant: 'food',
        tourist_attraction: 'tourist attraction',
        doctor: 'clinic',
        lodging: 'hotel',
        bakery: 'bread',
        park: '',
        supermarket: ''
      }
      const keyword = mapping[placeType]

      const query = `?keyword=${keyword}&lat=${this.latitude}&lng=${this.longitude}&radius=1000&type=${placeType}`
      const res = await axios.get(import.meta.env.VITE_BACKEND + '/nearbysearch' + query)
      const results = res.data.results
      // console.log(results);
      let processed_results = []
      for (let i = 1; i < results.length; i++) {
        if (
          results[i].name === undefined ||
          results[i].rating === undefined ||
          results[i].user_ratings_total === undefined ||
          results[i].geometry.location.lat === undefined ||
          results[i].geometry.location.lng === undefined
        ) {
          console.log('SKIP')
          continue
        }

        // Add row to processed_results
        let row = {
          name: results[i].name,
          rating: results[i].rating,
          user_ratings_total: results[i].user_ratings_total,
          latitude: results[i].geometry.location.lat,
          longitude: results[i].geometry.location.lng
        }
        processed_results.push(row)
      }

      processed_results.sort((a, b) => {
        // Sort by rating in descending order
        if (b.rating !== a.rating) {
          return b.rating - a.rating
        }
        // If ratings are equal, sort by number of ratings in descending order
        return b.user_ratings_total - a.user_ratings_total
      })
      processed_results = processed_results.slice(0, 8)
      return processed_results
    }
  },
  computed: {
    filteredPlaceData() {
      if (this.selectedPlaceType && this.data[this.selectedPlaceType]) {
        return this.data[this.selectedPlaceType]
      }
      return []
    }
  }
}
</script>

<template>
  <div>
    <div class="container md:max-w-96 mx-auto">
      <div
        class="main card rounded-xl bg-white flex flex-wrap lg:flex-nowrap items-center text-darkgreen"
      >
        <div class="basis-1/12 mt-2 lg:basis-1/12 lg:mt-0">
          <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo" />
        </div>
        <div class="basis-2/3 ml-2 lg:basis-4/12 lg:ml-0">
          <h2 class="font-bold text-lg lg:text-xl">{{ city.name }}</h2>
        </div>
      </div>

      <!-- Find out more about the city -->
      <div
        class="mt-3 mx-auto px-5 py-5 content rounded-xl bg-white h-auto text-darkgreen flex flex-row flex-wrap lg:flex-nowrap lg:px-8"
      >
        <div class="basis-full md:basis-2/5">
          <!-- Dropdown -->
          <el-select v-model="selectedPlaceType" class="m-2" placeholder="Select">
            <el-option
              v-for="(placeData, placeType) in this.data"
              :key="placeType"
              :label="placeType"
              :value="placeType"
              :data="this.data[placeType]"
            />
          </el-select>
          <div v-if="filteredPlaceData.length">
            <NearbyPlaceTab :data="filteredPlaceData" />
          </div>
        </div>

        <!-- Google Map -->
        <div class="mx-auto content h-auto lg:flex-nowrap">
          <div class="basis-full md:basis-3/5 p-5">
            <div class="google-maps">
              <GoogleMap
                :api-key="GOOGLE_MAP_API_KEY"
                style="width: 100%; height: 500px"
                :center="center"
                :zoom="15"
              >
                <Marker :options="{ position: center }" />
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CtaBanner class="mt-12 md:mt-20"></CtaBanner>
  </div>
</template>

<style scoped>
/* CSS styles go here */
.el-tabs__item.is-active {
  color: #000 !important;
}

.main {
  width: 100%;
  /* Ensure the card takes the full width of the page */
  display: flex;
  /* justify-content: center; Center horizontally */
  align-items: center;
  /* Center vertically */
  width: calc(100% - 20px);
  margin: 10px;
  height: 120px;
}

.content {
  width: 100%;
  width: calc(100% - 20px);
}

.university-logo {
  width: 50px;
  height: auto;
  margin-left: 20px;
  margin-right: 50px;
  flex-direction: flex-start;
}

.university-info {
  display: flex;
}

.university-name {
  display: flex;
  margin-right: 30px;
}

.font-bold {
  font-weight: bold;
}

.font-normal {
  font-weight: normal;
}

.text-xl {
  font-size: 1.25rem;
}

.svg-icon {
  display: inline;
  width: auto;
  height: 1em;
}

hr.solid {
  border-top: 1.5px solid #333;
}
</style>
