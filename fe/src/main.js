import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { Vue3Mq } from "vue3-mq"
import clickOutside from './helpers/click-outside-directive.js'
import appear from './helpers/transition-appear-directive'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { v4 as uuidv4 } from 'uuid';


const app = createApp(App)

app.directive('click-outside', clickOutside);
app.directive('appear', appear)
app.use(createPinia())
app.use(router)
app.use(Vue3Mq);
app.component('QuillEditor', QuillEditor)
app.config.globalProperties.$uuid = uuidv4;

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
