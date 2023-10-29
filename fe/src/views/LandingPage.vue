<template>
  <div class="coverBg rellax h-screen w-screen absolute bg-darkgreen overflow-x-hidden">
    <div class="imagesContainer flex min-w-full w-full h-auto min-h-full opacity-50">
      <Transition mode="out-in" name="fade-zoom">
        <img
          class="inline-block object-cover w-full"
          :style="imageStyle"
          :src="images[imgToShow]"
          :key="imgToShow"
        />
      </Transition>
      <!-- <img class="inline-block object-cover w-full" v-for="image, idx in images" :src="image" :key="idx"> -->
    </div>
  </div>

  <div
    data-rellax-speed="3"
    class="rellax content relative z-10 flex justify-center items-center min-h-screen"
  >
    <div class="loginWrapper w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col justify-center gap-4">
      <div class="copyWriting">
        <Transition mode="out-in" name="swing">
          <h1 v-if="heroShown == 'hello'" key="128121" class="text-lightgreen heroText">
            <div class="wave inline-block">👋</div>
            Students,<br />
            Welcome to <br />
            UniExplorers
          </h1>
          <h1 v-else key="3891893" class="text-lightgreen heroText inline-block">
            Effortless <br />
            Exchange <br />
            Exploration
          </h1>
        </Transition>
      </div>
      <div class="card bg-lightgreen p-8 rounded-lg">
        <div class="form-switch-buttons">
          <button
            :class="{
              'bg-darkgreen text-white': isLoginMode,
              'bg-white text-darkgreen': !isLoginMode
            }"
            @click="toggleMode(true)"
            class="w-1/2 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <button
            :class="{
              'bg-darkgreen text-white': !isLoginMode,
              'bg-white text-darkgreen': isLoginMode
            }"
            @click="toggleMode(false)"
            class="w-1/2 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Signup
          </button>
        </div>
        <loginForm v-if="isLoginMode" />
        <signupForm v-else />
      </div>
    </div>
  </div>

  <div data-rellax-speed="7" class="rellax moreCopyContent min-h-screen bg-lightgreen">
    <!-- TODO: Add more copy writing content -->

        <div class="flex space-around gap-16 h-[50vh] p-12">
            <entryAnimator transitiondelay="0.2s">
                <div class="card bg-white/30 flex-grow px-8 p-16 pt-12 border-none shadow-md">
                    <h2>
                        Tailor your <br/> Academic Experience
                    </h2>
                    <p class="text-content text-2xl opacity-60">
                        Map your mods quickly, discover your ideal environment and connect with fellow exchangers
                    </p>
                </div>
            </entryAnimator>
            <entryAnimator >
                <div class="card bg-white/30 flex-grow px-8 p-16 pt-12 border-none shadow-md">
                    <h2>
                        Exploration <br/> Made Easy
                    </h2>
                    <p class="text-content text-2xl opacity-60">
                        View recommended places by us and the community, embrace your wanderlust
                    </p>
                </div>
            </entryAnimator>
            <entryAnimator transitiondelay="0.3s">
                <div class="card bg-white/30 flex-grow p-16 pt-12 border-none shadow-md">
                    <h2>
                        Real Stories, <br/> Real Experiences
                    </h2>
                    <p class="text-content text-2xl opacity-60">
                        Trusted testimonies by the alumnis and
                        have a chat with them to experience their journey
                    </p>
                </div>
            </entryAnimator>
        </div>

        <article>
            
        </article>
    EYO BOB
  </div>

  <!-- <div class="pl-10 rightcard w-1/2 flex-1">
            <el-carousel height="auto" :interval="5000" arrow="always">
                <el-carousel-item style="height: 100vh" v-for="image in images" :key="image">
                    <el-image style="width: 100%; height: 100%" :key="image" :src="image" :fit="fill" />
                </el-carousel-item>
            </el-carousel>
        </div> -->

  <div class="globe-container flex flex-wrap items-center justify-center lg:justify-start mx-auto">
    <div id="map" class="basis-full lg:basis-1/2 mx-auto px-4"></div>
    <div class="text-container basis-full lg:basis-1/2 lg:pl-8 text-white p-2 lg:py-0">
      Sustainable Development Goal 4 (SDG 4) aims to ensure inclusive and equitable quality
      education and promote lifelong learning opportunities for all. This goal focuses on providing
      access to quality education at all levels and for all age groups, emphasizing inclusivity and
      lifelong learning to empower individuals and societies for a sustainable future. It seeks to
      address issues related to education, literacy, skills development, and educational equity to
      help achieve a more educated and informed global population.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import loginForm from '@/components/loginForm.vue'
import signupForm from '@/components/signupForm.vue'
import Rellax from 'rellax'
import * as d3 from 'd3'
import world_json from '@/assets/world.json'
import entryAnimator from '../components/entryAnimator.vue';

onMounted(() => {
  let rellax = new Rellax('.rellax')
  setInterval(swapHero, 4500)
  setInterval(swapImages, 6000)

  let width = document.getElementById('map').getBoundingClientRect().width
  let height = 500
  const sensitivity = 75

  let projection = d3
    .geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0, -30])
    .translate([width / 2, height / 2])

  const initialScale = projection.scale()
  let path = d3.geoPath().projection(projection)

  let svg = d3.select('#map').append('svg').attr('width', width).attr('height', height)

  let globe = svg
    .append('circle')
    .attr('fill', '#528BC4')
    .attr('stroke', '#000')
    .attr('stroke-width', '0.2')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', initialScale)

  let map = svg.append('g')

  async function loadMapData() {
    let data = await world_json

    map
      .append('g')
      .attr('class', 'countries')
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('class', (d) => 'country_' + d.properties.name.replace(' ', '_'))
      .attr('d', path)
      .attr('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', 0.3)
      .style('opacity', 0.8)
  }

  loadMapData()

  // Optional rotate
  d3.timer(function (elapsed) {
    const rotate = projection.rotate()
    const k = sensitivity / projection.scale()
    projection.rotate([rotate[0] - 1 * k, rotate[1]])
    path = d3.geoPath().projection(projection)
    svg.selectAll('path').attr('d', path)
  }, 200)
})

var imageStyle = ref(null)

const isLoginMode = ref(true)
var heroShown = ref('hello')
const images = Object.keys(
  import.meta.glob('@/assets/universities/*.png', { import: 'default', eager: true })
)
var imgToShow = ref(0)

function toggleMode(loginMode) {
  isLoginMode.value = loginMode
}

function swapHero() {
  if (heroShown.value == 'hello') {
    heroShown.value = 'bye'
  } else {
    heroShown.value = 'hello'
  }
}

function swapImages() {
  imgToShow.value++
  if (imgToShow.value >= images.length) {
    imgToShow.value = 0
  }

  // I CANT GET THIS FKING THING TO WORK
  // const randomX = Math.floor(Math.random() * 6) - 5
  // const randomY = Math.floor(Math.random() * 6) - 5

  // imageStyle.value = {
  //         position : 'absolute',
  //         transform : 'translate(0%)',
  //         transition: `transform 6s linear`,
  //     }

  // setTimeout(() => {
  //     imageStyle.value = { ...imageStyle.value,
  //         transform : `translate(${randomX}%, ${randomY}%)`
  //     }
  // }, 800)
}
</script>

<style scoped>
.swing-enter-active {
  animation: swing-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.swing-leave-active {
  animation: swing-out 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
}

.fade-zoom-enter-active {
  animation: fade-zoom-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.fade-zoom-leave-active {
  animation: fade-zoom-out 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes fade-zoom-in {
  0% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-zoom-out {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0;
  }
}

.imagesContainer {
  transform: translateX(0%);
}

.wave {
  transform-origin: 70% 70%;
  animation: wiggle 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite both;
}

@keyframes wiggle {
  0% {
    transform: rotate(10deg);
  }
  10% {
    transform: rotate(24deg);
  }
  20% {
    transform: rotate(2deg);
  }
  30% {
    transform: rotate(24deg);
  }
  40% {
    transform: rotate(6deg);
  }
  50% {
    transform: rotate(20deg);
  }
  60% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}

@keyframes swing-in {
  0% {
    -webkit-transform: rotateX(-70deg);
    transform: rotateX(-70deg);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    opacity: 1;
  }
}

@keyframes swing-out {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
    transform: rotateX(70deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
}

.form-switch-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
div p {
    line-height: 2em;
}

</style>
