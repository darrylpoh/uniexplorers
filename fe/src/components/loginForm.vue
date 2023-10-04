<script>

import { useAuthStore } from '../stores';
import checkBox from './checkBox.vue';

export default {
    name: 'loginForm',
    setup() {

    },
    components: {
        checkBox
    },
    data() {
        return {
            email: '',
            password: '',
            remember: false
        }
    },
    props: {

    },
    methods: {
        expandField() {

        },
        onSubmit() {
            console.log(this.email, this.password)
            
            const authStore = useAuthStore();
            return authStore.login(this.email, this.password)
                    .catch(error => {
                        console.log(error)
                    });
        }
    }
}
</script>

<template>
    <form class="space-y-6 h-133 z-10">
        <div>
            <label for="email" :class="email ? 'hidden' : 'block'"
                class="transition-all block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your email</label>
            <input type="email" v-model="email" class="textInput z-10" placeholder="name@company.com" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your password</label>
            <input type="password" v-model="password" placeholder="••••••••" class="textInput z-10" required>
        </div>
        <div class="flex items-center ">
            <checkBox v-model="remember" label="Remember me" :style="remember ? 'transform: translate(4px)' : ''" />
            <a href="#" class="ml-auto text-xs md:text-sm text-blue-700 hover:underline text-darkgreen">Forgot Password?</a>
        </div>
        <button type="submit" @click.prevent="onSubmit"
            class="w-full text-white bg-darkgreen hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 text-darkgreen">
            Login
        </button>
    </form>
</template>

<style scoped></style>