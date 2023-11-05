import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import axios from 'axios'
import router from '../router';
import { useCacheStore } from './cacheStore';

const baseUrl = `${import.meta.env.VITE_BACKEND}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    getters : {
        commentLikeStatus : (state) => { return (comment_id) => {
                if (state.user.user_data.comment_liked.includes(comment_id)) {
                    return true
                } else if (state.user.user_data.comment_disliked.includes(comment_id)) {
                    return false
                }
                return null
            }
        }
    },
    actions: {
        async updateUser(action, comment_id, data) {
            // this shit is legit cursed, i lost braincells alr
            var userObject = JSON.parse(localStorage.getItem('user'))
            if (action == 'like') {
                const have_liked = userObject.user_data.comment_liked.indexOf(comment_id)
                if (have_liked !== -1) {
                    userObject.user_data.comment_liked.splice(have_liked, 1);
                } else {
                    userObject.user_data.comment_liked.push(comment_id)
                }
                const found = userObject.user_data.comment_disliked.indexOf(comment_id)
                if (found !== -1) {
                    userObject.user_data.comment_disliked.splice(found, 1);
                }
            } else {
                const have_disliked = userObject.user_data.comment_disliked.indexOf(comment_id)
                if (have_disliked !== -1) {
                    userObject.user_data.comment_disliked.splice(have_disliked, 1);
                } else {
                    userObject.user_data.comment_disliked.push(comment_id)
                }
                const found = userObject.user_data.comment_liked.indexOf(comment_id)
                if (found !== -1) {
                    userObject.user_data.comment_liked.splice(found, 1);
                }
            }
            localStorage.setItem('user', JSON.stringify(userObject))
            this.user = userObject
            return
        },
        async login(email, password) {
            const user = await fetchWrapper.post(`${baseUrl}/login`, { email, password });

            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            axios.get(`${baseUrl}/images/${user.user_data.image_filename}`).then(res => {
                useCacheStore().addImg(user.user_data.image_filename, URL.createObjectURL(new Blob([res.data])))
            })

            // redirect to previous url or default to home page
            router.push('/explore');
        },
        async signup(email, password) {
            const name = email.split('@')[0]
            const user = await fetchWrapper.post(`${baseUrl}/users`, { email, password, name });

            // update pinia state
            this.user = user;

            // redirect to previous url or default to home page
            router.push('/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});