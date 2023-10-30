import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import router from '../router';

const baseUrl = `${import.meta.env.VITE_BACKEND}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            const user = await fetchWrapper.post(`${baseUrl}/login`, { email, password });

            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push('/explore');
        },
        async signup(email, password) {
            const user = await fetchWrapper.post(`${baseUrl}/users`, { email, password });

            // update pinia state
            this.user = user;

            // redirect to previous url or default to home page
            router.push('/login');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});