<script>

    import { fetchWrapper } from '@/helpers';
    import textAreaInput from './textAreaInput/textAreaInput.vue';
    import { useAuthStore, useCacheStore } from '../stores';

    export default {
        name: 'comment',
        components : {
            textAreaInput
        },
        data() {
            return {
                upvoteFill: false,
                downvoteFill: false,
                img : null,
                yourImg : null,
                children : null,
                debounceTimeout: null,
            }
        },
        computed : {
            reply() {
                return this.commentData.id == this.currentReply
            }
        },
        setup() {
            const CacheStore = useCacheStore()
            const { commentLikeStatus, user, updateUser } = useAuthStore()
            return { CacheStore, commentLikeStatus, user, updateUser }
        },
        mounted() {
            this.CacheStore.getImg(JSON.parse(localStorage.getItem('user')).user_data.image_filename).then(res => {
                this.yourImg = res
            })
            this.CacheStore.getImg(this.commentData.user_image_filename).then(res => {
                this.img = res
            })
            this.children = this.commentData.children
            this.upvoteFill = this.liked === true
            this.downvoteFill = this.liked === false
        },
        props : {
            commentData : {
                type : Object,
                required : true
            },
            child : {
                type : Boolean,
                default : false
            },
            currentReply : {
                type : Number
            },
            liked : {
                type : [Boolean, null],
                required : false,
                default : null
            }
        },
        methods : {
            willReply() {
                this.$emit('replying', this.commentData.id)
            },
            handlePost(postData) {

                if (!postData) {
                    this.$emit('replying', null)
                    return
                }
                
                fetchWrapper.post(import.meta.env.VITE_BACKEND + '/forum/comments', {
                    comment_text: postData.comment_text,
                    comment_text_raw: postData.comment_text_raw,
                    thread_id: this.$route.params.thread,
                    parent_id: this.commentData.id
                }).then(data => {
                    this.$emit('replying', null)
                    this.$emit('updateComments', true)
                }).catch(err => {
                    console.log(err);
                })
            },

            getTime(questionDate) {
                const [year, month, day] = new Date(questionDate).toISOString().split('T')[0].split('-').map(Number);
                questionDate = [day, month, year]

                const nowDate = new Date()
                const currentDate = [nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear()]
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

            updateVote(icon) { 
                if (icon === 'like') {
                        this.upvoteFill = !this.upvoteFill;
                        if (this.downvoteFill) {
                            this.downvoteFill = !this.downvoteFill;
                        }
                    } else {
                        this.downvoteFill = !this.downvoteFill;
                        if (this.upvoteFill) {
                            this.upvoteFill = !this.upvoteFill;
                        }
                    }
                
                    if (this.debounceTimeout) {
                        clearTimeout(this.debounceTimeout);
                    }
                    // Set a new debounce timeout
                    this.debounceTimeout = setTimeout(() => {
                    // Call the backend API here
                        if ((this.upvoteFill != (this.liked === true)) || (this.downvoteFill != (this.liked === false))) {
                            console.log('backend was called to ', icon, 'with', this.commentData.id, this.user.user_data.email);
                            fetchWrapper.post(import.meta.env.VITE_BACKEND + '/forum/comments/' + icon, {
                                comment_id : this.commentData.id,
                                user_email : this.user.user_data.email
                            }).then(data => {
                                this.updateUser(icon, this.commentData.id, data)
                                this.$emit('updateComments', true)
                            })
                        }
                    }, 1000); 
            },

        }
    }
</script>

<template>
<div class="user-question">
    <div class="username-container">
        <img class="avatar hidden sm:inline" :src="img" alt="">
        <div class="question-container w-full flex flex-col">
            <p class="username text-darkgreen">@{{ commentData.user_email.split('@')[0] }}</p>
            <p class="timestamp">{{ getTime(commentData.created) }}</p>
            <p class="question-text text-darkgreen" v-html="commentData.comment_text_raw"></p>

            <!-- <div class="border-top text-right pr-8">
                <span v-if="!reply && !this.child" @click="willReply" class="cursor-pointer hover:scale-110">Reply</span>
            </div> -->
            <hr>
            <ul class="question-footer flex mt-2 select-none">
                <li>
                    <svg v-if="upvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('like')" class="thumbs-icon">
                    <path d="M7.24001 11V20H5.63001C4.73001 20 4.01001 19.28 4.01001 18.39V12.62C4.01001 11.73 4.74001 11 5.63001 11H7.24001ZM18.5 9.5H13.72V6C13.72 4.9 12.82 4 11.73 4H11.64C11.24 4 10.88 4.24 10.72 4.61L7.99001 11V20H17.19C17.92 20 18.54 19.48 18.67 18.76L19.99 11.26C20.15 10.34 19.45 9.5 18.51 9.5H18.5Z" fill="#000000"/>
                    </svg>
                    <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('like')" class="thumbs-icon">
                    <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#000000"/>
                    </svg>
                    <span>{{ commentData.num_likes + (upvoteFill ? 1 : 0) + (liked === true ? -1 : 0)}}</span>
                </li>
                <li>
                    <svg v-if="downvoteFill" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('dislike')" class="thumbs-icon">
                    <path d="M20 5.61V11.38C20 12.27 19.27 13 18.38 13H16.77V4H18.38C19.28 4 20 4.72 20 5.61ZM5.34001 5.24L4.02001 12.74C3.86001 13.66 4.56001 14.5 5.50001 14.5H10.28V18C10.28 19.1 11.18 20 12.27 20H12.36C12.76 20 13.12 19.76 13.28 19.39L16.01 13V4H6.81001C6.08001 4 5.46001 4.52 5.33001 5.24H5.34001Z" fill="#000000"/>
                    </svg>
                    <svg v-else width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="updateVote('dislike')" class="thumbs-icon">
                    <path d="M18.38 3.25H6.81C5.72 3.25 4.79 4.03 4.6 5.11L3.29 12.61C3.18 13.27 3.36 13.94 3.78 14.45C4.21 14.96 4.83 15.25 5.5 15.25H9.53V18C9.53 19.52 10.76 20.75 12.36 20.75C13.06 20.75 13.69 20.33 13.97 19.68L16.51 13.75H18.39C19.7 13.75 20.76 12.69 20.76 11.38V5.61C20.76 4.31 19.7 3.25 18.39 3.25H18.38ZM15.26 12.85L12.59 19.1C12.55 19.19 12.46 19.26 12.27 19.26C11.58 19.26 11.03 18.7 11.03 18.01V13.76H5.5C5.27 13.76 5.07 13.67 4.93 13.5C4.78 13.33 4.73 13.11 4.77 12.88L6.08 5.38C6.14 5.02 6.45001 4.76 6.82 4.76H15.26V12.85ZM19.25 11.38C19.25 11.86 18.86 12.25 18.38 12.25H16.77V4.75H18.38C18.86 4.75 19.25 5.14 19.25 5.61V11.38Z" fill="#000000"/>
                    </svg>
                    <span>{{ commentData.num_dislikes + (downvoteFill ? 1 : 0) + (liked === false ? -1 : 0)}}</span>
                </li>
                <li class="grow flex justify-end">
                    <span v-if="!reply && !this.child" @click="willReply" class="cursor-pointer text-base hover:scale-110">Reply</span>
                </li>
                <!-- <li v-if="!child" class="li-text" @click="reply = true">Reply</li> -->
            </ul>

            <!-- Craft Comment -->
            <div v-if="reply" class="create-section mt-5 flex">
                <div class="hidden sm:block">
                    <img :src="yourImg" alt="" class="avatar">
                </div>
                <div class="flex flex-grow">
                    <textAreaInput :thread_id="commentData.thread_id" :comment_id="commentData.id" @posted="handlePost" name="reply" textCTA="Reply"/>
                </div>
            </div>

            <!-- Children comments -->
            <div v-for="child in children">
                <comment :commentData="child" :currentReply="currentReply" :child="true" @updateComments="$emit('updateComments', true)" :liked="commentLikeStatus(child.id)" @replying="willReply"/>
            </div>

        </div>
    </div>
</div>

</template>

<style scoped>
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
  flex-direction: row;
  margin-left: 10px;
  font-size: 0.8rem
}

.question-footer li {
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.question-footer li span {
  margin-right: 10px;
  margin-left: 5px;
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
.avatar {
  min-width: 52px;
  height: 52px;
  border-radius: 16px;
}
</style>