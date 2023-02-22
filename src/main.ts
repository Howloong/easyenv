import {createApp} from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import axios from "axios";
import VueAxios from 'vue-axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    });


