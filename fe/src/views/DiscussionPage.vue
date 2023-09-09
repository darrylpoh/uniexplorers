<template>

    <div class="main card sticky top-0 bg-white flex items-center border border-lightgrey text-darkgreen">
      <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo absolute left-4 md:left-auto md:relative mx-0 opacity-20 md:opacity-100 md:mx-8 w-16 md:w-12 xl:w-14">
      <div class="university-info grid grid-rows-2 z-10">
        <div class="university-name">
          <h2 class="font-bold text-base xl:text-2xl">IMPERIAL COLLEGE LONDON</h2>
        </div>

        <div class="location-gpa-semester md:row-start-2 ">

        <div class="location font-bold">
            <svg class="svg-icon" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.47143 0 0 4.5385 0 10.15C0 12.673 0.714285 15.0365 2.01429 17.168C3.37143 19.401 5.15714 21.315 6.52857 23.548C7.2 24.6355 7.68571 25.6505 8.2 26.825C8.57143 27.6225 8.87143 29 10 29C11.1286 29 11.4286 27.6225 11.7857 26.825C12.3143 25.6505 12.7857 24.6355 13.4571 23.548C14.8286 21.3295 16.6143 19.4155 17.9714 17.168C19.2857 15.0365 20 12.673 20 10.15C20 4.5385 15.5286 0 10 0ZM10 14.1375C8.02857 14.1375 6.42857 12.5135 6.42857 10.5125C6.42857 8.5115 8.02857 6.8875 10 6.8875C11.9714 6.8875 13.5714 8.5115 13.5714 10.5125C13.5714 12.5135 11.9714 14.1375 10 14.1375Z" fill="#1E363E"/>
            </svg>
            London, UK
        </div>
        <div class="gpa font-bold">
            <svg class="svg-icon" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.36364 16.4011V22.8456L17.5 29L28.6364 22.8456V16.4011L17.5 22.5556L6.36364 16.4011ZM17.5 0L0 9.66667L17.5 19.3333L31.8182 11.4228V22.5556H35V9.66667L17.5 0Z" fill="black"/>
            </svg>
            3.7 GPA
        </div>
        <div class="time font-bold">
            <svg class="svg-icon" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z" fill="black"/>
            </svg>
            1 Semester
        </div>
        </div>
      </div>
    </div>

    <div class="discussionContentWrapper grid grid-cols-12">
      <div class="discussionsWrapper flex flex-col gap-1 col-span-12 md:col-span-8 xxl:col-span-6 md:col-start-2 xl:col-start-2 xxl:col-start-2 ">
      <!-- AMA -->
        <DiscussCard title="AMA about {schoolName}">
          <!-- Content for AMA card -->
        </DiscussCard>
      <!-- Accoms -->
      <DiscussCard title="Accommodation">
        <!-- Content for Accoms card -->
      </DiscussCard>
      <!-- Budget -->
      <DiscussCard title="Budget">
        <!-- Content for Budget card -->
      </DiscussCard>
      <!-- To Do -->
      <DiscussCard title="What to do in this city (Maybe can pull the city name)?">
        <!-- Content for Living card -->
      </DiscussCard>
      <!-- Discuss Card 5 -->
      <DiscussCard title="Who's Going to {schoolName}">
        <!-- Content for Who's Going card -->
      </DiscussCard>
      </div>
    </div>
  </template>

  <script>
  import DiscussCard from "@/components/DiscussCard.vue";

  export default {
    name: "App",
    components: {
      DiscussCard,
    },
  };
  </script>

  
  <style scoped>
  /* CSS styles go here */
  
  .main {
    display: flex;
    align-items: center; /* Center vertically */
    padding: 1rem 10%;
    /* height: 120px; */
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
  
  .university-logo {
    /* width: 50px; */
    height: auto;
    /* margin-left: 20px;
    margin-right: 50px; */
    flex-direction: flex-start;
  }
  .location-gpa-semester {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .svg-icon {
    display: inline;
    width: auto;
    height: 1em;
  }
  
  </style>
  