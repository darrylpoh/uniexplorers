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

      <!-- Nav -->

      <div class="nav-container">
        <ul class="comment-nav">
          <li class="comment-count" v-if="questions.length !== 1">
            {{ questions.length }}
            questions
          </li>
          <li class="comment-count" v-else>
            {{ questions.length }}
            comment
          </li>
          <li class="comment-username">
            <svg style="color: rgb(30, 54, 62);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill chat-icon" viewBox="0 0 16 16"> <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" fill="#1e363e"></path> </svg>
            <span class="user">{{ username }}</span>
          </li>
        </ul>
      </div>

      <!-- Input field and "Create" button for asking questions -->
      
      <div class="create-section">
        <div>
          <img :src="profile" alt="" class="avatar">
        </div>
        <!-- <oldtextinput/> -->
        <textInputQuill/>
        <!-- <div class="inputArea flex-grow">
          
        </div> -->
      </div>

      <!-- Display each question card separately -->

      <div v-for="(question, index) in questions" :key="index" class="question-card card rounded-lg bg-white">
        <!-- User's Question -->
        <div class="user-question">

          <div class="username-container">
            <img class="avatar" :src="question.profile" alt="">
            <div class="question-container">
              <p class="username text-darkgreen">{{ question.username }}</p>
              <p class="timestamp">{{ getTime(question) }}</p>
              <div v-if="question.edit" class="w-full mb-5">
                <div class="mb-4 ml-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <!-- Text area -->
                    <div class="dark:bg-gray-800 ">
                        <textarea 
                        id="editor" rows="8" :class="['block', 'w-full', 'text-gray-800' ,'bg-white', 'border-0', 'rounded-lg', 'dark:bg-gray-800' , 'dark:text-white', 'px-4', 'py-2', 'dark:placeholder-gray-400', 'h-48', 'post-actions']" placeholder="Ask away!" required v-model="question.text" @focus="focus = true">
                        </textarea>
                    </div>
                    <!-- WYSISWG items -->
                    <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                      <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                          <div class="flex items-center space-x-1 sm:pr-4">
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                  </svg>
                                  <span class="sr-only">Attach file</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                  </svg>
                                  <span class="sr-only">Embed map</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                  </svg>
                                  <span class="sr-only">Upload image</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                      <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/>
                                  </svg>
                                  <span class="sr-only">Format code</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                                  </svg>
                                  <span class="sr-only">Add emoji</span>
                              </button>
                          </div>
                          <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                  </svg>
                                  <span class="sr-only">Add list</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                                  </svg>
                                  <span class="sr-only">Settings</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                                      <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                                  </svg>
                                  <span class="sr-only">Timeline</span>
                              </button>
                              <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                  </svg>
                                  <span class="sr-only">Download</span>
                              </button>
                          </div>
                      </div>
                      <button type="button" data-tooltip-target="tooltip-fullscreen" class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                          </svg>
                          <span class="sr-only">Full screen</span>
                      </button>
                      <div id="tooltip-fullscreen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                          Show full screen
                          <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <p @click="question.edit = false" class="text-sm font-bold text-darkgreen mr-3 cursor-pointer">Cancel</p>
                      <button @click="editQuestion(question)" class="text-sm font-medium text-center text-white bg-darkgreen rounded-lg create-button cursor-pointer">
                          Save Edit
                      </button>
                    </div>
                </div>
              </div>
              <p v-else class="question-text text-darkgreen" >{{ question.text }}</p>
              <ul class="question-footer">
                <li>
                  <svg v-if="question.upvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('upvote', question)" class="thumbs-icon">
                    <path d="M7.24001 11V20H5.63001C4.73001 20 4.01001 19.28 4.01001 18.39V12.62C4.01001 11.73 4.74001 11 5.63001 11H7.24001ZM18.5 9.5H13.72V6C13.72 4.9 12.82 4 11.73 4H11.64C11.24 4 10.88 4.24 10.72 4.61L7.99001 11V20H17.19C17.92 20 18.54 19.48 18.67 18.76L19.99 11.26C20.15 10.34 19.45 9.5 18.51 9.5H18.5Z" fill="#000000"/>
                  </svg>
                  <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('upvote', question)" class="thumbs-icon">
                    <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#000000"/>
                  </svg>
                  <span>{{ question.upvote }}</span>
                </li>
                <li>
                  <svg v-if="question.downvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('downvote', question)" class="thumbs-icon">
                    <path d="M20 5.61V11.38C20 12.27 19.27 13 18.38 13H16.77V4H18.38C19.28 4 20 4.72 20 5.61ZM5.34001 5.24L4.02001 12.74C3.86001 13.66 4.56001 14.5 5.50001 14.5H10.28V18C10.28 19.1 11.18 20 12.27 20H12.36C12.76 20 13.12 19.76 13.28 19.39L16.01 13V4H6.81001C6.08001 4 5.46001 4.52 5.33001 5.24H5.34001Z" fill="#000000"/>
                  </svg>
                  <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('downvote', question)" class="thumbs-icon">
                    <path d="M18.38 3.25H6.81C5.72 3.25 4.79 4.03 4.6 5.11L3.29 12.61C3.18 13.27 3.36 13.94 3.78 14.45C4.21 14.96 4.83 15.25 5.5 15.25H9.53V18C9.53 19.52 10.76 20.75 12.36 20.75C13.06 20.75 13.69 20.33 13.97 19.68L16.51 13.75H18.39C19.7 13.75 20.76 12.69 20.76 11.38V5.61C20.76 4.31 19.7 3.25 18.39 3.25H18.38ZM15.26 12.85L12.59 19.1C12.55 19.19 12.46 19.26 12.27 19.26C11.58 19.26 11.03 18.7 11.03 18.01V13.76H5.5C5.27 13.76 5.07 13.67 4.93 13.5C4.78 13.33 4.73 13.11 4.77 12.88L6.08 5.38C6.14 5.02 6.45001 4.76 6.82 4.76H15.26V12.85ZM19.25 11.38C19.25 11.86 18.86 12.25 18.38 12.25H16.77V4.75H18.38C18.86 4.75 19.25 5.14 19.25 5.61V11.38Z" fill="#000000"/>
                  </svg>
                  <span>{{ question.downvote }}</span>
                </li>
                <li class="li-text" @click="question.edit = true">Edit</li>
                <li>•</li>
                <li class="li-text" @click="question.reply = true">Reply</li>
              </ul>

              <!-- Craft Comment -->
              <div v-if="question.reply" class="create-section mt-5">
                <div>
                  <img :src="profile" alt="" class="avatar">
                </div>
                <div class="w-full">
                  <div class="mb-4 ml-1 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <!-- Text area -->
                      <div class="dark:bg-gray-800">
                          <textarea 
                          id="editor" rows="8" :class="['block', 'w-full','text-sm', 'text-gray-800' ,'bg-white', 'border-0', 'rounded-lg', 'dark:bg-gray-800' , 'dark:text-white', 'px-4', 'py-2', 'dark:placeholder-gray-400', 'h-32', 'post-actions']" placeholder="Ask away!" required v-model="question.newComment">
                          </textarea>
                      </div>
                      <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600" >
                        <!-- WYSISWG items -->
                        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                            <div class="flex items-center space-x-1 sm:pr-4">
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                    </svg>
                                    <span class="sr-only">Attach file</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                    </svg>
                                    <span class="sr-only">Embed map</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                        <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/>
                                    </svg>
                                    <span class="sr-only">Format code</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                                    </svg>
                                    <span class="sr-only">Add emoji</span>
                                </button>
                            </div>
                            <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                    </svg>
                                    <span class="sr-only">Add list</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                                    </svg>
                                    <span class="sr-only">Settings</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                                        <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                                    </svg>
                                    <span class="sr-only">Timeline</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span class="sr-only">Download</span>
                                </button>
                            </div>
                        </div>
                        <button type="button" data-tooltip-target="tooltip-fullscreen" class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                            </svg>
                            <span class="sr-only">Full screen</span>
                        </button>
                        <div id="tooltip-fullscreen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Show full screen
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <p @click="question.reply = false" class="text-sm font-bold text-darkgreen mr-3 cursor-pointer">Cancel</p>
                        <button @click="postComment(question)" class="text-sm font-medium text-center text-white bg-darkgreen rounded-lg create-button cursor-pointer">
                            Publish Comment
                        </button>
                      </div>
                  </div>
                </div>
              </div>

              <!-- Comment section -->
                <div v-for="(comment, commentIndex) in question.comments.slice()" :key="commentIndex" class="comment-section">
                  <!-- <div class="username-container">
                    <img :src="comment.profile" alt="" class="avatar comment">
                    <p class="username font-semibold text-darkgreen">{{ comment.username }}</p>
                  </div>
                  <p class="comment comment-text text-darkgreen">{{ comment.text }}</p> -->
                  <img class="avatar" :src="comment.profile" alt="">

                  <div class="comment">
                    <p class="username text-darkgreen">{{ comment.username }}</p>
                    <p class="timestamp">{{ getTime(comment) }}</p>
                    <div v-if="comment.edit" class="w-full mb-5">
                      <div class="mb-4 ml-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <!-- Text area -->
                      <div class="dark:bg-gray-800 ">
                          <textarea
                          id="editor" rows="8" :class="['block', 'w-full', 'text-gray-800' ,'bg-white', 'border-0', 'rounded-lg', 'dark:bg-gray-800' , 'dark:text-white', 'px-4', 'py-2', 'dark:placeholder-gray-400', 'h-48', 'post-actions']" placeholder="Ask away!" required v-model="comment.text" @focus="focus = true">
                          </textarea>
                      </div>
                      <!-- WYSISWG items -->
                      <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                            <div class="flex items-center space-x-1 sm:pr-4">
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                    </svg>
                                    <span class="sr-only">Attach file</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                    </svg>
                                    <span class="sr-only">Embed map</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                        <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/>
                                    </svg>
                                    <span class="sr-only">Format code</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                                    </svg>
                                    <span class="sr-only">Add emoji</span>
                                </button>
                            </div>
                            <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                    </svg>
                                    <span class="sr-only">Add list</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                                    </svg>
                                    <span class="sr-only">Settings</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                                        <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                                    </svg>
                                    <span class="sr-only">Timeline</span>
                                </button>
                                <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span class="sr-only">Download</span>
                                </button>
                            </div>
                        </div>
                        <button type="button" data-tooltip-target="tooltip-fullscreen" class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                            </svg>
                            <span class="sr-only">Full screen</span>
                        </button>
                        <div id="tooltip-fullscreen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Show full screen
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <p @click="comment.edit = false" class="text-sm font-bold text-darkgreen mr-3 cursor-point">Cancel</p>
                        <button @click="editQuestion(comment)" class="text-sm font-medium text-center text-white bg-darkgreen rounded-lg create-button cursor-pointer">
                            Save Edit
                        </button>
                      </div>
                                    </div>
                                  </div>
                                  <p v-else class="question-text text-darkgreen" >{{ comment.text }}</p>
                                  <ul class="question-footer">
                                    <li>
                    <svg v-if="comment.upvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('upvote', comment)" class="thumbs-icon">
                      <path d="M7.24001 11V20H5.63001C4.73001 20 4.01001 19.28 4.01001 18.39V12.62C4.01001 11.73 4.74001 11 5.63001 11H7.24001ZM18.5 9.5H13.72V6C13.72 4.9 12.82 4 11.73 4H11.64C11.24 4 10.88 4.24 10.72 4.61L7.99001 11V20H17.19C17.92 20 18.54 19.48 18.67 18.76L19.99 11.26C20.15 10.34 19.45 9.5 18.51 9.5H18.5Z" fill="#000000"/>
                    </svg>
                    <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('upvote', comment)" class="thumbs-icon">
                      <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#000000"/>
                    </svg>
                    <span>{{ comment.upvote }}</span>
                                    </li>
                                    <li>
                    <svg v-if="comment.downvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('downvote', comment)" class="thumbs-icon">
                      <path d="M20 5.61V11.38C20 12.27 19.27 13 18.38 13H16.77V4H18.38C19.28 4 20 4.72 20 5.61ZM5.34001 5.24L4.02001 12.74C3.86001 13.66 4.56001 14.5 5.50001 14.5H10.28V18C10.28 19.1 11.18 20 12.27 20H12.36C12.76 20 13.12 19.76 13.28 19.39L16.01 13V4H6.81001C6.08001 4 5.46001 4.52 5.33001 5.24H5.34001Z" fill="#000000"/>
                    </svg>
                    <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('downvote', comment)" class="thumbs-icon">
                      <path d="M18.38 3.25H6.81C5.72 3.25 4.79 4.03 4.6 5.11L3.29 12.61C3.18 13.27 3.36 13.94 3.78 14.45C4.21 14.96 4.83 15.25 5.5 15.25H9.53V18C9.53 19.52 10.76 20.75 12.36 20.75C13.06 20.75 13.69 20.33 13.97 19.68L16.51 13.75H18.39C19.7 13.75 20.76 12.69 20.76 11.38V5.61C20.76 4.31 19.7 3.25 18.39 3.25H18.38ZM15.26 12.85L12.59 19.1C12.55 19.19 12.46 19.26 12.27 19.26C11.58 19.26 11.03 18.7 11.03 18.01V13.76H5.5C5.27 13.76 5.07 13.67 4.93 13.5C4.78 13.33 4.73 13.11 4.77 12.88L6.08 5.38C6.14 5.02 6.45001 4.76 6.82 4.76H15.26V12.85ZM19.25 11.38C19.25 11.86 18.86 12.25 18.38 12.25H16.77V4.75H18.38C18.86 4.75 19.25 5.14 19.25 5.61V11.38Z" fill="#000000"/>
                    </svg>
                    <span>{{ comment.downvote }}</span>
                                    </li>
                                    <li class="li-text" @click="comment.edit = true">Edit</li>
                                    <!-- <li>•</li> -->
                                    <!-- <li class="li-text" @click="comment.reply = true">Reply</li> -->
                                  </ul>
                  </div>
            </div>
              

            </div>
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
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import textInputQuill from './textInput.vue'
// import oldtextinput from './TEMPOLDTEXTINPUT.vue'


export default {
  components: {
    // oldtextinput,
    textInputQuill
  },
  data() {
    return {
      newQuestion: '', // Holds the user's new question input
      questions: [{
        username: 'Jared',
        text: "Can I work part-time while on an exchange program, and what are the regulations regarding student employment?",
        profile: '../../public/Profile Female.png',
        newComment:'',
        comments:[
          {username: 'Jared', // Replace this with the actual username of the user
          profile: '../../public/Profile Female.png',
          text: "Can I work part-time while on an exchange program, and what are the regulations regarding student employment?",
          date: [15, 10, 2023],
          upvote: 1,
          downvote: 0,
          upvoteFill: false,
          downvoteFill: false,
          edit: false,
          reply: false,
          }
        ],
        date: [11, 10, 2023],
        upvote: 1,
        downvote: 0,
        upvoteFill: false,
        downvoteFill: false,
        edit: false,
        reply: false,
      },
    ],   // Array to store all the questions and their comments
      username: 'Jared',
      profile: '../../public/Profile Female.png',
      focus: false,

    };
  },
  computed: {
    
  },

  methods: {
    createQuestion() {
      if (this.newQuestion.trim() === '') {
        return; // Do not create a question if the input is empty
      }

      // Create a new question card object
      const newQuestionCard = {
        username: this.username, // Replace this with the actual username of the user
        text: this.newQuestion.trim(),
        profile: this.profile,
        newComment: '', // To store the comment input temporarily
        comments: [],   // Array to store comments for the question
        date: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()],
        upvote: 0,
        downvote: 0,
        upvoteFill: false,
        downvoteFill: false,
        edit: false,
        reply: false,
      };

      // Add the new question card to the top of the questions array
      this.questions.unshift(newQuestionCard);

      console.log(newQuestionCard)

      // Clear the input field after creating the question
      this.newQuestion = '';
    },

    postComment(question) {
      if (question.newComment.trim() === '') {
        return; // Do not post a comment if the input is empty
      }

      // Create a new comment object
      const newComment = {
        username: this.username, // Replace this with the actual username of the user
        profile: this.profile,
        text: question.newComment.trim(),
        date: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()],
        upvote: 0,
        downvote: 0,
        upvoteFill: false,
        downvoteFill: false,
        edit: false,
        reply: false,
      };

      // Push the new comment to the comments array of the corresponding question
      question.comments.push(newComment);

      // Clear the comment input field after posting the comment
      question.newComment = '';

      question.reply = !question.reply
    },

    getTime(question) {
      const currentDate = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()]
      const questionDate = question.date
      let result = ''

      let index = 2
      let timestamp = 'year'
      while (index >= 0) {
        if (currentDate[index] - questionDate[index] > 0) {
          if (currentDate[index] - questionDate[index] > 1) {
            result = (currentDate[index] - questionDate[index]) + ' ' + timestamp + 's ago'
          } else {
            result = (currentDate[index] - questionDate[index]) + ' ' + timestamp + ' ago'
          }
          break
        } 
        index--
        if (index == 1) {
          timestamp = 'month'
        } else {
          timestamp = 'day'
        }
      }
      
      return result ? result : 'Today'
    },

    updateVote(icon, question) { 
      if (icon === 'upvote') {
        question.upvoteFill = !question.upvoteFill
        question.upvoteFill ? ++question.upvote : --question.upvote
        if (question.downvoteFill) {
          question.downvoteFill = !question.downvoteFill
          question.downvoteFill ? ++question.downvote : --question.downvote
        }
      } else {
        question.downvoteFill = !question.downvoteFill
        question.downvoteFill ? ++question.downvote : --question.downvote
        if (question.upvoteFill) {
          question.upvoteFill = !question.upvoteFill
          question.upvoteFill ? ++question.upvote : --question.upvote
        }
      }
    },

    editQuestion(question) {
      question.edit = false
      const txt = question.text
      question.text = txt
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

.nav-container {
  border-bottom: 2px solid #e7e9ee;
  margin-bottom: 24px;
}

.comment-nav {
  list-style: none;
  display: inline-block;
  width: 100%;
}

.chat-icon {
  height: 1em;
  width: auto;
  display: inline;
}

.comment-count {
  font-weight: 500;
  float: left;
}

.user {
  font-weight: 500;
  float: right;
  margin-top: 2px;
  margin-left: 4px;
}

.comment-username {
  float: right;
  font-weight: 500;
}

.create-section {
  display: flex;
  align-items: flex-start;
  cursor: text
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 16px;
}


.post-actions {
  transition: all .15s cubic-bezier(0.42, 0, 0.21, 0.65);
  font-size: 1rem;
}

.create-button {
  margin: 0;
  padding: 7px 15px; /* Add padding to the input field */
  border-radius: 14px;
  border: 1px solid #ccc; /* Add a border to the input field */
  margin-right: 2px;
  margin-top: 1px;
  float: right;
  /* Change the background color to a pleasing blue */
  color: white; /* Change text color to white */
  font-weight: bold;
  border: none; /* Remove the button border */
  cursor: pointer; /* Show a pointer cursor on hover */
}

.question-card {
  margin-top: 20px; /* Add some spacing between each question card */
}

.user-question {
  margin-bottom: 10px; /* Add some spacing between the user question and the comment section */
} 
.username-container {
  display: flex;
  margin-top: 10px;
  flex-direction: row;
}

.username {
  margin: 0; /* Remove margin to avoid unnecessary space */
  margin-left: 10px;
  font-size: 1rem;
  font-weight: 500;
  vertical-align: top;
  margin-bottom: 6px;
}

.timestamp {
  color: grey;
  font-size: 0.7rem;
  margin-left: 10px;
  margin-bottom: 10px;
}

.question-text {
  margin: 0; /* Remove margin to avoid unnecessary space */
  font-size: 1.5rem;
  margin-left: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
}

.question-footer {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  font-size: 0.8rem
}

.question-footer li {
  margin-right: 5px;
}

.question-footer li span {
  margin-right: 10px;
}

.thumbs-icon {
  display: inline-block;
}

.thumbs-icon:hover {
  cursor:pointer
}

.li-text {
  font-weight: 500;
}

.comment-section {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
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

</style>
