<script setup>
import myFooter from '../components/myFooter.vue';
import singleReview from '../components/singleReview.vue';
import ctaBanner from '../components/ctaBanner.vue';

let budget = {
  "rent": 2000,
  "food": 500,
  "transport": 100,
  "misc": 50
}

let courses = ["COR-IS1702 - Computational Thinking", "IS112 - Data Management", "COR3001 - Big Questions"]
let reviews = [
  {
    "name": "Oliver OG",
    "date": "10 May 2023",
    "comment": "Studying at Imperial College London through the exchange program was an incredible experience. The university's commitment to academic excellence and cutting-edge research truly impressed me. The professors were highly knowledgeable and approachable, and the coursework challenged me to expand my knowledge and skills. The campus itself is vibrant and multicultural, providing a welcoming and inclusive environment. I highly recommend the Imperial College London exchange program!"
  },
  {
    "name": "Emily Smith",
    "date": "2 June 2023",
    "comment": "My time at Imperial College London was unforgettable. The exchange program offered a wide range of courses, and I had the opportunity to learn from world-renowned experts in my field of study. The campus facilities were state-of-the-art, and the university's emphasis on practical learning enhanced my academic journey. Moreover, the city of London provided countless cultural and social opportunities. I made lifelong friends from different corners of the globe. I am grateful for the incredible experiences I had during my exchange at Imperial College London."
  },
  {
    "name": "Michael Johnson",
    "date": "14 June 2023",
    "comment": "Imperial College London is a top-notch institution, and being part of their exchange program was a privilege. The quality of education and the resources available to students were outstanding. The university's strong focus on research allowed me to engage in cutting-edge projects and collaborate with brilliant minds. Additionally, the diverse and inclusive community fostered a rich cultural exchange. Living in London was an added bonus, with its vibrant atmosphere and countless attractions. I would definitely choose Imperial College London again for an exchange program."
  },
  {
    "name": "Sophia Adams",
    "date": "1 July 2023",
    "comment": "I had an amazing time studying abroad at Imperial College London. The exchange program provided a seamless transition into the university's academic environment. The faculty members were incredibly supportive, and the coursework was intellectually stimulating. The campus facilities were modern and well-equipped, and the extracurricular activities offered a perfect balance between academics and social engagement. The location in the heart of London added to the experience, allowing me to explore the city's historical landmarks and vibrant cultural scene. I highly recommend Imperial College London's exchange program."
  },
  {
    "name": "Daniel Lee",
    "date": "7 July 2023",
    "comment": "Imperial College London exceeded my expectations during my exchange program. The university's reputation for excellence is well-deserved, as the professors were experts in their fields and offered engaging lectures and seminars. The exchange program also provided valuable networking opportunities, allowing me to connect with professionals and researchers in my area of interest. The multicultural environment enriched my experience, and the support services provided by the university were exceptional. My time at Imperial College London was transformative, and I am grateful for the knowledge and memories gained."
  }
]

function truncate(text, length, clamp) {
  clamp = clamp || "...";
  let words = text.split(' ');
  return words.length > length ? words.slice(0, length).join(' ') + clamp : text;
}

for (let i=0; i<reviews.length; i++) {
  reviews[i].comment_trunc = truncate(reviews[i].comment, 40)
}

</script>

<template>
  <div>
    <div class="container md:max-w-96 mx-auto">
      <div class="main card rounded-xl bg-white flex flex-wrap lg:flex-nowrap items-center text-darkgreen">
        <div class="basis-1/12 mt-2 lg:basis-1/12 lg:mt-0">
          <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo">
        </div>
        <div class="basis-2/3 ml-2 lg:basis-4/12 lg:ml-0">
          <h2 class="font-bold text-lg lg:text-xl">IMPERIAL COLLEGE LONDON</h2>
        </div>
        <div class="basis-full lg:basis-1/2 location-gpa-semester prose-base lg:prose-lg flex gap-2 justify-center md:justify-start md:text-md md:gap-6">
          <div class="location font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C4.47143 0 0 4.5385 0 10.15C0 12.673 0.714285 15.0365 2.01429 17.168C3.37143 19.401 5.15714 21.315 6.52857 23.548C7.2 24.6355 7.68571 25.6505 8.2 26.825C8.57143 27.6225 8.87143 29 10 29C11.1286 29 11.4286 27.6225 11.7857 26.825C12.3143 25.6505 12.7857 24.6355 13.4571 23.548C14.8286 21.3295 16.6143 19.4155 17.9714 17.168C19.2857 15.0365 20 12.673 20 10.15C20 4.5385 15.5286 0 10 0ZM10 14.1375C8.02857 14.1375 6.42857 12.5135 6.42857 10.5125C6.42857 8.5115 8.02857 6.8875 10 6.8875C11.9714 6.8875 13.5714 8.5115 13.5714 10.5125C13.5714 12.5135 11.9714 14.1375 10 14.1375Z"
                fill="#1E363E" />
            </svg>
            London, UK
          </div>
          <div class="gpa font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.36364 16.4011V22.8456L17.5 29L28.6364 22.8456V16.4011L17.5 22.5556L6.36364 16.4011ZM17.5 0L0 9.66667L17.5 19.3333L31.8182 11.4228V22.5556H35V9.66667L17.5 0Z"
                fill="black" />
            </svg>
            3.7 GPA
          </div>
          <div class="time font-bold">
            <svg class="svg-icon md:mr-1" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z"
                fill="black" />
            </svg>
            1 Semester
          </div>
        </div>
      </div>
  
      <!-- Image Gallery -->
      <div class="container content md:max-w-full flex flex-row mt-3 mx-auto flex-wrap lg:flex-nowrap">
        <div class="basis-full mb-2 md:mb-0 lg:basis-2/5">
          <img class="lg:max-w-xl lg:h-[24.5rem] rounded-lg" src="@/assets/universities/uni-image1.jpg" alt="">
        </div>
        <div class="basis-full md:ml-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <img class="lg:h-48 lg:w-full rounded-lg" src="@/assets/universities/imperial/imperial-5.jpg"
                alt="">
            </div>
            <div>
              <img class="lg:h-48 lg:w-full rounded-lg"
                src="@/assets/universities/imperial/imperial-2.jpeg" alt="">
            </div>
            <div>
              <img class="lg:h-48 lg:w-full rounded-lg"
                src="@/assets/universities/imperial/imperial-3.jpg" alt="">
            </div>
            <div>
              <img class="lg:h-48 lg:w-full rounded-lg"
                src="@/assets/universities/imperial/imperial-4.jpeg" alt="">
            </div>
          </div>
        </div>
      </div>
  
      <!-- Get to Know Us Section -->
      <div class="mt-3 mx-auto px-5 py-5 content rounded-xl bg-white h-auto text-darkgreen flex flex-row flex-wrap lg:flex-nowrap lg:px-8">
        <div class="basis-full md:basis-3/5">
          <h2 class="font-semibold text-xl">Get to Know Us</h2>
          <hr class="solid">
  
          <!-- Description -->
          <p class="mt-3 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum, felis nec dictum euismod, velit
            ipsum congue metus, eu semper nunc ante in orci. Etiam malesuada posuere quam, ac viverra tortor finibus sit
            amet. Cras hendrerit orci purus, a congue tellus finibus eget. Pellentesque pharetra, velit quis eleifend
            luctus, massa leo vehicula orci, quis interdum urna ante ut tortor.
          </p>
        </div>
  
        <!-- Aside section -->
        <div class="basis-full lg:basis-2/5 lg:ml-8 lg:mt-0 mt-4 px-4 py-4 border border-solid border-black rounded-xl h-auto">
          <h3 class="font-semibold text-lg">Accommodation</h3>
          <hr class="solid">
  
          <div class="pt-2">
            <p>Offered by Uni</p>
            <p>Link</p>
          </div>
  
          <h3 class="font-semibold text-lg mt-3">Budgeting</h3>
          <hr class="solid">
          <div class="pt-2">
            <p>Rent: ${{ budget.rent }}</p>
            <p>Food: ${{ budget.food }}</p>
            <p>Transport: ${{ budget.transport }} </p>
            <p>Misc: ${{ budget.misc }} </p>
          </div>
  
          <h3 class="font-semibold text-lg mt-3">Courses Taken</h3>
          <hr class="solid">
          <div class="pt-2">
            <p v-for="course in courses" :key="course">{{ course }}</p>
          </div>
        </div>
      </div>
  
      <!-- Exchangers' Experience Section -->
      <div class="mt-3 mx-2 px-5 md:px-8 py-5 content rounded-xl bg-white h-auto text-darkgreen flex flex-wrap">
        <div class="basis-full sm:basis-3/5">
          <h2 class="font-semibold text-lg md:text-xl">Exchangers' Experience</h2>
          <hr class="solid">
  
          <h2 class="font-semibold text-base lg:text-lg mt-2">All Experiences: Overwhelmingly Positive (100)</h2>
        </div>
  
        <div class="flex sm:basis-2/5 md:justify-end lg:justify-center md:my-2 lg:my-4">
          <button type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
            font-medium rounded-lg text-sm px-6 py-4">Leave
            a Review</button>
        </div>
  
        <div class="basis-full mt-4 md:mt-8">
          <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <singleReview v-for="review in reviews" :key="review" :review="review"></singleReview>
          </div>
        </div>
      </div>
    </div>
    <ctaBanner class="mt-12 md:mt-20"></ctaBanner>

  </div>
</template>
  
<style scoped>
/* CSS styles go here */

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
  