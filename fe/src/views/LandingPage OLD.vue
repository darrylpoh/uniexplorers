<template>
    <div class="p-8">
        <div class="bg-lightgreen rounded-lg h-screen overflow-auto flex">
            <div class="p-10 leftcard w-1/2 flex-1">
                <div class="logo w-full">
                    <img src="/Dark Logo.png" class="h-24">
                </div>
                <h5 class="font-caudex w-full text-left text-[70px] font-medium text-darkgreen leading-tight">
                    Find The University of Your Dreams
                </h5>
                <div class="w-full inline-flex">
                    <button
                        :class="{ 'bg-darkgreen text-white': isLoginMode, 'bg-white text-darkgreen': !isLoginMode }"
                        @click="toggleMode(true)"
                        class="w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Login
                    </button>
                    <button
                        :class="{ 'bg-darkgreen text-white': !isLoginMode, 'bg-white text-darkgreen': isLoginMode }"
                        @click="toggleMode(false)"
                        class="w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Signup
                    </button>
                </div>
                <form v-if="isLoginMode" class="space-y-6 h-133" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your
                            email</label>
                        <input type="email" name="email" id="email"
                            class="textInput"
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your
                            password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="textInput"
                            required>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value=""
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 text-darkgreen">Remember
                                me</label>
                        </div>
                        <a href="#" class="ml-auto text-sm text-blue-700 hover:underline text-darkgreen">Lost Password?</a>
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-darkgreen hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 text-darkgreen">
                        Login to your account
                    </button>
                </form>

                <!-- Signup form fields here -->
                <form v-else class="space-y-6 h-133" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Your
                            email</label>
                        <input type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-darkgreen"
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-darkgreen"
                            required>
                    </div>
                    <div>
                        <label for="confirmPassword"
                            class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">Confirm password</label>
                        <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-darkgreen"
                            required>
                    </div>
                    <div>
                        <label for="university"
                            class="block mb-2 text-sm font-medium text-gray-900 text-darkgreen">University</label>
                        <select name=""
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-darkgreen">
                            <option value="SMU">SMU</option>
                            <option value="NTU">NTU</option>
                            <option value="NUS">NUS</option>
                            <option value="SMU">SUTD</option>
                        </select>
                    </div>

                    <button type="submit"
                        class="w-full text-white bg-darkgreen hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 text-darkgreen">
                        Signup >
                    </button>
                </form>
            </div>
            <div class="pl-10 rightcard w-1/2 flex-1">
                <el-carousel height="auto" :interval="5000" arrow="always">
                    <el-carousel-item style="height: 100vh" v-for="image in images" :key="image">
                        <el-image style="width: 100%; height: 100%" :key="image" :src="image" :fit="fill" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const isLoginMode = ref(true);

const images = import.meta.glob('@/assets/universities/*.png', { import: 'default', eager: true });

function toggleMode(loginMode) {
    isLoginMode.value = loginMode;
}
</script>
  
<style scoped>
/* CSS styles for the component */
</style>
