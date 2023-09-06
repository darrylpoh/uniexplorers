<template>
    <!-- University Information Card -->
  <div class="main university-info card rounded-lg bg-white flex items-center border-2 text-darkgreen">
    <div class="university-logo">
      <img src="../../public/Imperial.png" alt="Imperial Logo" class="university-logo">
    </div>
    <div class="university-name">
      <h2 class="font-bold text-xl">IMPERIAL COLLEGE LONDON</h2>
    </div>
  </div>

  <!-- Card for "AMA about school" topic -->
  <div class="main topic-card card rounded-lg bg-white">
    <h3 class="topic font-bold text-xl text-darkgreen">AMA about school</h3>
  </div>

  <!-- Input field and "Create" button for asking questions -->
  <div class="main create-section">
    <input v-model="newQuestion" type="text" class="create-question flex-1" placeholder="Enter your question...">
    <button @click="createQuestion" class="create-button">Create</button>
  </div>

  <!-- Display each question card separately -->
  <div v-for="(question, index) in questions" :key="index" class="main question-card card rounded-lg bg-white">
    <!-- User's Question -->
    <div class="user-question">
      <p class="username font-semibold">Your Username</p>
      <p class="question-text">{{ question.text }}</p>
    </div>

    <!-- Comment section -->
    <div class="comment-section">
      <div v-for="(comment, commentIndex) in question.comments.slice()" :key="commentIndex" class="comment">
        <p class="username font-semibold">{{ comment.username }}</p>
        <p class="comment-text">{{ comment.text }}</p>
      </div>
    </div>

    <!-- Input box for user comments -->
    <div class="comment-input">
      <input v-model="question.newComment" type="text" class="create-comment flex-1" placeholder="Enter your comment...">
      <button @click="postComment(question)" class="post-comment-button">Post Comment</button>
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
  margin: 30px;
}

.university-info {
  padding: 20px; /* Add some padding to the university info card */
}

.university-logo {
  width: 50px;
  height: auto;
  margin-right: 20px; /* Adjust the margin to improve the spacing */
}

.university-name {
  display: flex;
  align-items: center;
}

.university-name h2 {
  font-weight: bold;
  margin: 0; /* Remove margin to avoid unnecessary space */
}

.topic-card {
  padding: 20px; /* Add padding to the topic card */
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
  background-color: #007BFF; /* Change the background color to a pleasing blue */
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

.username {
  font-weight: bold;
  margin: 0; /* Remove margin to avoid unnecessary space */
}

.question-text {
  margin: 0; /* Remove margin to avoid unnecessary space */
}

.comment {
  margin-top: 10px;
  padding-top: 10px; /* Add some padding to the comment */
  border-top: 1px solid #ccc; /* Add a border between comments */
}

.comment-text {
  margin: 0; /* Remove margin to avoid unnecessary space */
}

.comment-input {
  display: flex;
  align-items: center;
  margin-top: 10px; /* Add some spacing between the comment section and the input box */
}

.create-comment {
  margin: 0;
  padding: 10px; /* Add padding to the input field */
  border-radius: 0.5rem;
  border: 1px solid #ccc; /* Add a border to the input field */
  margin-right: 10px;
}

.post-comment-button {
  padding: 10px 20px; /* Add padding to the "Post Comment" button */
  border-radius: 0.5rem;
  background-color: #28A745; /* Change the background color to a pleasing green */
  color: white; /* Change text color to white */
  font-weight: bold;
  border: none; /* Remove the button border */
  cursor: pointer; /* Show a pointer cursor on hover */
}

</style>
