<template>
        
    
    <div class="coverBg rellax h-screen w-screen absolute bg-darkgreen overflow-x-hidden" >
        <div class="imagesContainer flex w-full h-auto opacity-50" >

            <Transition mode="out-in" name="fade-zoom">
                <img class="inline-block object-cover w-full" :style="imageStyle" :src="images[imgToShow]" :key="imgToShow">
            </Transition>
            <!-- <img class="inline-block object-cover w-full" v-for="image, idx in images" :src="image" :key="idx"> -->
        </div>
    </div>

    <div data-rellax-speed="3" class="rellax content relative z-10 flex justify-center items-center min-h-screen">

        <div class="loginWrapper w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col justify-center gap-4">
            <div class="copyWriting">
                <Transition mode="out-in" name="swing">
                    <h1 v-if="heroShown == 'hello'" key="128121" class="text-lightgreen heroText"><div class="wave inline-block">👋</div> Students,<br> Welcome to <br> UniExplorers</h1>
                    <h1 v-else key="3891893" class="text-lightgreen heroText inline-block">Effortless <br> Exchange <br> Exploration</h1>
                </Transition>

            </div>
            <div class="card bg-lightgreen p-8 rounded-lg">
                <div class="form-switch-buttons">
                <button :class="{ 'bg-darkgreen text-white': isLoginMode, 'bg-white text-darkgreen': !isLoginMode }" @click="toggleMode(true)" class="w-1/2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Login
                </button>
                <button :class="{ 'bg-darkgreen text-white': !isLoginMode, 'bg-white text-darkgreen': isLoginMode }" @click="toggleMode(false)" class="w-1/2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Signup
                </button>
                </div>
                <loginForm v-if="isLoginMode" />
                <signupForm v-else />
            </div>
        </div>

        
    </div>
    
    <div data-rellax-speed="7" class="rellax moreCopyContent min-h-screen bg-darkgreen">
        <!-- TODO: Add more copy writing content -->
        EYO BOB
    </div>

        <!-- <div class="pl-10 rightcard w-1/2 flex-1">
            <el-carousel height="auto" :interval="5000" arrow="always">
                <el-carousel-item style="height: 100vh" v-for="image in images" :key="image">
                    <el-image style="width: 100%; height: 100%" :key="image" :src="image" :fit="fill" />
                </el-carousel-item>
            </el-carousel>
        </div> -->
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import loginForm from '@/components/loginForm.vue'
import signupForm from '@/components/signupForm.vue'
import Rellax from 'rellax'

onMounted(() => {
    let rellax = new Rellax('.rellax');
    setInterval(swapHero, 4500)
    setInterval(swapImages, 6000)
})


var imageStyle = ref(null);


const isLoginMode = ref(true);
var heroShown = ref('hello')
const images = Object.keys(import.meta.glob('@/assets/universities/*.png', { import: 'default', eager: true }));
var imgToShow = ref(0)

function toggleMode(loginMode) {
    isLoginMode.value = loginMode;
}

function swapHero() {
    if (heroShown.value == 'hello') {
        heroShown.value = 'bye'
    } else {
        heroShown.value = 'hello'
    }
}

function swapImages() {


    imgToShow.value++
    if (imgToShow.value >= images.length) {
        imgToShow.value = 0
    }


    // I CANT GET THIS FKING THING TO WORK
    // const randomX = Math.floor(Math.random() * 6) - 5
    // const randomY = Math.floor(Math.random() * 6) - 5

    // imageStyle.value = {
    //         position : 'absolute',
    //         transform : 'translate(0%)',
    //         transition: `transform 6s linear`,
    //     }

    // setTimeout(() => {
    //     imageStyle.value = { ...imageStyle.value,
    //         transform : `translate(${randomX}%, ${randomY}%)`
    //     }
    // }, 800)

}



</script>

<style scoped>

.swing-enter-active {
    animation: swing-in 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;

}
.swing-leave-active {
    animation: swing-out 0.8s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}

.fade-zoom-enter-active {
    animation: fade-zoom-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.fade-zoom-leave-active {
    animation: fade-zoom-out 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}



@keyframes fade-zoom-in {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-zoom-out {
    0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
    opacity: 0;
  }
}





.imagesContainer {
    transform: translateX(0%);
}

.wave {
    transform-origin: 70% 70%;  
    animation: wiggle 1.5s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite both;
}


@keyframes wiggle {
    0% { transform: rotate( 10.0deg) }
   10% { transform: rotate(24.0deg) } 
   20% { transform: rotate(2.0deg) }
   30% { transform: rotate(24.0deg) }
   40% { transform: rotate(6.0deg) }
   50% { transform: rotate(20.0deg) }
   60% { transform: rotate( 10.0deg) }
  100% { transform: rotate( 10.0deg) }
}


@keyframes swing-in {
  0% {
    -webkit-transform: rotateX(-70deg);
            transform: rotateX(-70deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
}

@keyframes swing-out {
  0% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
            transform: rotateX(70deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
}

.form-switch-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}


</style>
