import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import { Vue3Mq } from "vue3-mq";

// Vue.prototype.$http = Axios;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Mq);


app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
