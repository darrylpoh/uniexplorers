<script>
import axios from 'axios';
import MyFooter from '../components/myFooter.vue';
import SingleReview from '../components/singleReview.vue';
import CtaBanner from '../components/ctaBanner.vue';
import UniCarousel from '../components/UniCarousel.vue';
import ReviewModal from '../components/ReviewModal.vue';
import { GoogleMap, Marker } from "vue3-google-map";
import NearbyPlaceTab from '../components/NearbyPlaceTab.vue';

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
      university: {},
      courses: ["COR-IS1702 - Computational Thinking", "IS112 - Data Management", "COR3001 - Big Questions"],
      reviews: [
        {
          "name": "Oliver OG",
          "date": "10 May 2023",
          "comment": "Studying at Imperial College London through the exchange program was an incredible experience. The university's commitment to academic excellence and cutting-edge research truly impressed me. The professors were highly knowledgeable and approachable, and the coursework challenged me to expand my knowledge and skills. The campus itself is vibrant and multicultural, providing a welcoming and inclusive environment. I highly recommend the Imperial College London exchange program!"
        },
        {
          "name": "Emily Smith",
          "date": "2 June 2023",
          "comment": "My time at Imperial College London was unforgettable. The exchange program offered a wide range of courses, and I had the opportunity to learn from world-renowned experts in my field of study. The campus facilities were state-of-the-art, and the university's emphasis on practical learning enhanced my academic journey. Moreover, the city of London provided countless cultural and social opportunities. I made lifelong friends from different corners of the globe. I am grateful for the incredible experiences I had during my exchange at Imperial College London."
        }
      ]
    };
  },
  async beforeMount() {
    this.university.name = 'Singapore Management University'

    await this.getCoordinates()
    this.nearbyHotelsData = await this.fetchData("lodging");
    this.nearbyAttractionsData = await this.fetchData("tourist_attraction");
    this.nearbyRestaurantsData = await this.fetchData("restaurant");
    console.log(this.nearbyHotelsData)
    console.log(this.nearbyAttractionsData)
    console.log(this.nearbyRestaurantsData)
    this.activeTab = 'first'

    let query = '?name=Singapore Management University'
    axios.get(import.meta.env.VITE_BACKEND + '/universities/' + query).then((res) => {
      this.university = res.data[0]
    }).catch((err) => {
      if (err.code == 'ERR_NETWORK') {
        this.error = "DB Not Connected..."
      }
    })

    // query = '?university_name=Singapore Management University'
    // axios.get(import.meta.env.VITE_BACKEND + '/reviews/' + query).then((res) => {
    //   this.reviews = res.data
    //   console.log(this.reviews)
    // }).catch((err) => {
    //   if (err.code == 'ERR_NETWORK') {
    //     this.error = "DB Not Connected..."
    //   }
    // })

    for (let i = 0; i < this.reviews.length; i++) {
      this.reviews[i].comment_trunc = this.truncate(this.reviews[i].comment, 40)
    }

    this.columns = ['Name', 'Rating', 'Total Ratings']
    this.width = 400
    this.height = 400
  },
  methods: {
    truncate(text, length, clamp) {
      clamp = clamp || "...";
      let words = text.split(' ');
      return words.length > length ? words.slice(0, length).join(' ') + clamp : text;
    },
    async getCoordinates() {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.university.name}&key=${this.GOOGLE_MAP_API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
        this.center = { lat: this.latitude, lng: this.longitude };
      } else {
        this.latitude = null;
        this.longitude = null;
        console.log("Unable to get coordinates.");
      }
    },

    async fetchData(placeType) {
      // const keyword = placeType !== 'lodging' ? placeType : "";
      const mapping = {'restaurant': 'food', 'tourist_attraction': 'tourist attraction', 'lodging': ''}
      const keyword = mapping[placeType]

      const query = `?keyword=${keyword}&lat=${this.latitude}&lng=${this.longitude}&radius=1000&type=${placeType}`;
      const res = await axios.get(import.meta.env.VITE_BACKEND + '/nearbysearch' + query);
      const results = res.data.results;
      let processed_results = [];
      for (let i = 1; i < results.length; i++) {
        if (
          results[i].name === undefined ||
          results[i].rating === undefined ||
          results[i].user_ratings_total === undefined ||
          results[i].geometry.location.lat === undefined ||
          results[i].geometry.location.lng === undefined
        ) {
          console.log("SKIP");
          continue;
        }

        // Add row to processed_results
        let row = {
          name: results[i].name,
          rating: results[i].rating,
          user_ratings_total: results[i].user_ratings_total,
          latitude: results[i].geometry.location.lat,
          longitude: results[i].geometry.location.lng,
        };
        processed_results.push(row);
      }

      processed_results.sort((a, b) => {
        // Sort by rating in descending order
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // If ratings are equal, sort by number of ratings in descending order
        return b.user_ratings_total - a.user_ratings_total;
      });
      processed_results = processed_results.slice(0, 5);
      return processed_results
    }
  },
};
</script>

<template>
  <div>
    <div class="container md:max-w-96 mx-auto">
      <div class="main card rounded-xl bg-white flex flex-wrap lg:flex-nowrap items-center text-darkgreen">
        <div class="basis-1/12 mt-2 lg:basis-1/12 lg:mt-0">
          <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo">
        </div>
        <div class="basis-2/3 ml-2 lg:basis-4/12 lg:ml-0">
          <h2 class="font-bold text-lg lg:text-xl">{{ university.name }}</h2>
        </div>
        <div
          class="basis-full lg:basis-1/2 location-gpa-semester prose-base lg:prose-lg flex gap-2 justify-center md:justify-start md:text-md md:gap-6">
          <div class="location font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C4.47143 0 0 4.5385 0 10.15C0 12.673 0.714285 15.0365 2.01429 17.168C3.37143 19.401 5.15714 21.315 6.52857 23.548C7.2 24.6355 7.68571 25.6505 8.2 26.825C8.57143 27.6225 8.87143 29 10 29C11.1286 29 11.4286 27.6225 11.7857 26.825C12.3143 25.6505 12.7857 24.6355 13.4571 23.548C14.8286 21.3295 16.6143 19.4155 17.9714 17.168C19.2857 15.0365 20 12.673 20 10.15C20 4.5385 15.5286 0 10 0ZM10 14.1375C8.02857 14.1375 6.42857 12.5135 6.42857 10.5125C6.42857 8.5115 8.02857 6.8875 10 6.8875C11.9714 6.8875 13.5714 8.5115 13.5714 10.5125C13.5714 12.5135 11.9714 14.1375 10 14.1375Z"
                fill="#1E363E" />
            </svg>
            {{ university.continent }} • {{ university.location }}
          </div>
          <div class="gpa font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.36364 16.4011V22.8456L17.5 29L28.6364 22.8456V16.4011L17.5 22.5556L6.36364 16.4011ZM17.5 0L0 9.66667L17.5 19.3333L31.8182 11.4228V22.5556H35V9.66667L17.5 0Z"
                fill="black" />
            </svg>
            Min. GPA: {{ university.gpa }}
          </div>
          <!-- <div class="time font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z"
                fill="black" />
            </svg>
            1 Semester
          </div> -->
        </div>
      </div>

      <div class="mx-auto content h-auto lg:flex-nowrap">
        <UniCarousel />
      </div>

      <!-- Get to Know Us Section -->
      <div
        class="mt-3 mx-auto px-5 py-5 content rounded-xl bg-white h-auto text-darkgreen flex flex-row flex-wrap lg:flex-nowrap lg:px-8">
        <div class="basis-full md:basis-2/5">

          <el-tabs v-model="activeTab" class="nearby-search-tabs" @tab-click="handleClick">
            <el-tab-pane label="Nearby Hotels" name="first">
              <NearbyPlaceTab :data="nearbyHotelsData"/>
            </el-tab-pane>
            <el-tab-pane label="Nearby Attractions" name="second">
              <NearbyPlaceTab :data="nearbyAttractionsData"/>
            </el-tab-pane>
            <el-tab-pane label="Nearby Restaurants" name="third">
              <NearbyPlaceTab :data="nearbyRestaurantsData"/>
            </el-tab-pane>
          </el-tabs>

        </div>

        <div class="basis-full md:basis-3/5 p-5">
          <div class="google-maps">
            <GoogleMap :api-key="GOOGLE_MAP_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
              <Marker :options="{ position: center }" />
            </GoogleMap>
          </div>
        </div>

      </div>

      <!-- Exchangers' Experience Section -->
      <div class="mt-3 mx-2 px-5 md:px-8 py-5 content rounded-xl bg-white h-auto text-darkgreen flex flex-wrap">
        <div class="basis-full sm:basis-3/5">
          <h2 class="font-semibold text-lg md:text-xl">Exchangers' Experience</h2>
          <hr class="solid">

          <!-- <h2 class="font-semibold text-base lg:text-lg mt-2">All Experiences: Overwhelmingly Positive (100)</h2> -->
        </div>

        <div class="flex sm:basis-2/5 md:justify-end lg:justify-center md:my-2 lg:my-4">
          <ReviewModal></ReviewModal>
        </div>

        <div class="basis-full mt-4 md:mt-8">
          <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <SingleReview v-for="review in reviews" :key="review" :review="review"></SingleReview>
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
  /* flex-direction: flex-start; */
}

.university-name {
  display: flex;
  margin-right: 30px;
  /* align-items: flex-start; */
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
  