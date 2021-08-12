import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false
import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Card from "./components/Card.vue"
Vue.component('m-card', Card)
import listCard from "./components/listCard.vue"
Vue.component('m-list-card', listCard)
import axios from 'axios'
import './plugins/dayjs'
Vue.prototype.$http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/web/api'
        // baseURL: 'http://localhost:3000/web/api'
})



Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')