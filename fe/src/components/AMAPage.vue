<template>
  <!-- - AMA page [isabelle]
  - indent to the answers(comments)
  - bold the qns
  - add in description for ama about school (below ama about school)  -->
  <!-- maybe we should add a breadcrumb like home > uni page > forum > discussion -->
  <div class="main overflow-y-auto">
    <!-- Menu -->
    <div class="menu-card bg-white border-2 rounded-xl text-darkgreen">
      <p class="menu">Menu</p>
      <router-link to="/explore" class="menu-link font-bold">Home</router-link>
      <router-link to="/unihomepage" class="menu-link font-bold">University</router-link>
      <router-link to="discussionpage" class="menu-link font-bold">Discussion</router-link>
      <router-link to="explorecitiespage" class="menu-link font-bold">City</router-link>
    </div>

    <!-- Title of discussion -->
    <div class="topic-card bg-white border-2 rounded-xl text-darkgreen">
      <h2 class="title font-bold text-darkgreen">AMA School</h2>
      <!-- Input field and "Create" button for asking questions -->
      <div class="create-section">
        <input v-model="newQuestion" type="text" class="create-question flex-1" placeholder="Enter your question...">
        <button @click="createQuestion" class="create-button">Create</button>
      </div>
      <!-- Display each question card separately -->
      <div v-for="(question, index) in questions" :key="index" class="ain question-card card rounded-lg bg-white">
        <!-- User's Question -->
        <div class="user-question">
          <div class="username-container">
            <img :src="question.profile" alt="" class="profile-photo ">
            <p class="username font-semibold text-darkgreen">Your Username</p>
          </div>
          <p class="question-text text-darkgreen">{{ question.text }}</p>
        </div>
        <!-- Input box for user comments -->
        <div class="comment-input">
          <textarea v-model="question.newComment" type="text" class="create-comment text-darkgreen" placeholder="Enter your comment..."></textarea>
          <button @click="postComment(question)" class="post-comment-button">Post Comment</button>
        </div>
        <!-- Comment section -->
        <div class="comment-section">
          <div v-for="(comment, commentIndex) in question.comments.slice()" :key="commentIndex" :class="commentIndex > 0 ? 'comment' : 'comment-border'" >
            <div class="username-container">
              <img :src="comment.profile" alt="" class="profile-photo comment">
              <p class="username font-semibold text-darkgreen">{{ comment.username }}</p>
            </div>
            <p class="comment comment-text text-darkgreen">{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- University Information Card -->
    <div class="university-info-card rounded-xl bg-white border-2 text-darkgreen">
      <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo">
      <div class="university-info break-words text-center">
          <h2>IMPERIAL COLLEGE LONDON</h2>
      </div>
      <div class="location-gpa-semester">
        <div class="font-bold info">
            <svg class="svg-icon" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.47143 0 0 4.5385 0 10.15C0 12.673 0.714285 15.0365 2.01429 17.168C3.37143 19.401 5.15714 21.315 6.52857 23.548C7.2 24.6355 7.68571 25.6505 8.2 26.825C8.57143 27.6225 8.87143 29 10 29C11.1286 29 11.4286 27.6225 11.7857 26.825C12.3143 25.6505 12.7857 24.6355 13.4571 23.548C14.8286 21.3295 16.6143 19.4155 17.9714 17.168C19.2857 15.0365 20 12.673 20 10.15C20 4.5385 15.5286 0 10 0ZM10 14.1375C8.02857 14.1375 6.42857 12.5135 6.42857 10.5125C6.42857 8.5115 8.02857 6.8875 10 6.8875C11.9714 6.8875 13.5714 8.5115 13.5714 10.5125C13.5714 12.5135 11.9714 14.1375 10 14.1375Z" fill="#1E363E"/>
            </svg>
            London, UK
        </div>
        <div class="font-bold info">
            <svg class="svg-icon" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.36364 16.4011V22.8456L17.5 29L28.6364 22.8456V16.4011L17.5 22.5556L6.36364 16.4011ZM17.5 0L0 9.66667L17.5 19.3333L31.8182 11.4228V22.5556H35V9.66667L17.5 0Z" fill="black"/>
            </svg>
            3.7 GPA
        </div>
        <div class="font-bold info">
            <svg class="svg-icon" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z" fill="black"/>
            </svg>
            1 Semester
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: '', // Holds the user's new question input
      questions: [],   // Array to store all the questions and their comments
    };
  },
  methods: {
    createQuestion() {
      if (this.newQuestion.trim() === '') {
        return; // Do not create a question if the input is empty
      }

      // Create a new question card object
      const newQuestionCard = {
        username: 'Your Username', // Replace this with the actual username of the user
        text: this.newQuestion.trim(),
        profile: '../../public/Profile Female.png',
        newComment: '', // To store the comment input temporarily
        comments: [],   // Array to store comments for the question
      };

      // Add the new question card to the top of the questions array
      this.questions.unshift(newQuestionCard);

      // Clear the input field after creating the question
      this.newQuestion = '';
    },

    postComment(question) {
      if (question.newComment.trim() === '') {
        return; // Do not post a comment if the input is empty
      }

      // Create a new comment object
      const newComment = {
        username: 'Your Username', // Replace this with the actual username of the user
        profile: '../../public/Profile Female.png',
        text: question.newComment.trim(),
      };

      // Push the new comment to the comments array of the corresponding question
      question.comments.push(newComment);

      // Clear the comment input field after posting the comment
      question.newComment = '';
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
.main {
  display: flex;
  flex-direction: row;
  margin: 20px
}
.menu-card {
  margin: 10px;
  margin-right: 20px;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.menu-link {
  font-size: 1.3rem;
  margin-top: 10px;
}
.university-info-card { /* Ensure the card takes the full width of the page */
  display: flex;
  flex-direction: column;
  /* justify-content: center; Center horizontally */
  align-items: center; /* Center vertically */
  width: 20%;
  margin: 10px;
  margin-left: 20px;
  height: fit-content;
  padding: 30px 0 30px 0;
}

.university-logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px
}
.university-info {
  font-weight: bold;
  font-size: 2rem;
}
.location-gpa-semester {
  gap: 1rem;
  margin-left: 20px;
  flex-direction: flex-start;
}
.info {
  margin-top: 20px;
  font-size: 1rem;
}
.svg-icon {
  display: inline;
  width: auto;
  height: 2em;
}

.topic-card {
  padding: 20px; /* Add padding to the topic card */
  width: 70%;
  margin: 10px;
}
.post-comment-button {
  padding: 10px 20px; /* Add padding to the "Post Comment" button */
  border-radius: 0.5rem; /* Change the background color to a pleasing green */
  color: white; /* Change text color to white */
  font-weight: bold;
  border: none; /* Remove the button border */
  cursor: pointer; /* Show a pointer cursor on hover */
  display: block;
}
.title {
  text-align: center;
  font-size: 3rem;
}

.create-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.create-question {
  margin: 0;
  padding: 10px; /* Add padding to the input field */
  border-radius: 0.5rem;
  border: 1px solid #ccc; /* Add a border to the input field */
  margin-right: 10px;
}

.create-button {
  padding: 10px 20px; /* Add padding to the "Create" button */
  border-radius: 0.5rem;
  /* Change the background color to a pleasing blue */
  color: white; /* Change text color to white */
  font-weight: bold;
  border: none; /* Remove the button border */
  cursor: pointer; /* Show a pointer cursor on hover */
}

.question-card {
  margin-top: 20px; /* Add some spacing between each question card */
  padding: 20px; /* Add padding to the question card */
}

.user-question {
  margin-bottom: 10px; /* Add some spacing between the user question and the comment section */
}
.username-container {
  display: flex;
  margin-top: 10px;
}
.username {
  font-weight: bold;
  margin: 0; /* Remove margin to avoid unnecessary space */
  margin-left: 10px;
}

.question-text {
  margin: 0; /* Remove margin to avoid unnecessary space */
  font-weight: bold;
  font-size: 1.5rem;
  margin: 15px 0 ;
}

.comment-border {
  margin-top: 20px;
  padding-top: 10px; /* Add some padding to the comment */
  border-top: 1px solid #ccc; /* Add a border between comments */
  
}

.comment {
  margin: 0; /* Remove margin to avoid unnecessary space */
}

.comment-text {
  padding-top: 10px; /* Add some padding to the comment */
  margin-bottom: 20px
}
.comment-input {
  margin-top: 10px; /* Add some spacing between the comment section and the input box */
}

.create-comment {
  margin: 0;
  padding: 10px; /* Add padding to the input field */
  border-radius: 0.5rem;
  width: 50%;
  height: 100px;
  border: 1px solid #ccc; /* Add a border to the input field */
  margin-bottom: 15px;
}



.profile-photo {
  width: 30px;
  height: 30px;
}
</style>
