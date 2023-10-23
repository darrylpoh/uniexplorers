<template>
    <form class="space-y-6 h-133 z-10">
      <div>
        <label for="email" :class="email ? 'hidden' : 'block'" class="transition-all block mb-2 text-sm font-medium text-gray-900 text-darkgreen">
          Your email
        </label>
        <input type="email" v-model="email" class="textInput z-10" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your password</label>
        <input type="password" v-model="password" placeholder="••••••••" class="textInput z-10" required>
      </div>
      <div>
        <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Confirm password</label>
        <input type="password" v-model="confirmPassword" placeholder="••••••••" class="textInput z-10" required>
      </div>
      <div class="flex items-center ">
        <checkBox v-model="remember" label="Remember me" :style="remember ? 'transform: translate(4px)' : ''" />
      </div>
      <button type="submit" @click.prevent="onSubmit" class="w-full text-white bg-darkgreen hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 text-darkgreen">
        Sign Up
      </button>
    </form>
  </template>
  
  <script>
  import { useAuthStore } from '../stores';
  import checkBox from './checkBox.vue';
  
  export default {
    name: 'signupForm',
    components: {
      checkBox
    },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        remember: false
      }
    },
    methods: {
      onSubmit() {
        if (this.password !== this.confirmPassword) {
          console.log('Passwords do not match');
          return;
        }
  
        console.log(this.email, this.password);
        
        const authStore = useAuthStore();
        return authStore.signup(this.email, this.password)
                .then(() => {
                })
                .catch(error => {
                  console.log(error);
                });
      }
    }
  }
  </script>
  
  <style scoped></style>
  