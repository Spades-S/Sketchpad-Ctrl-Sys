/***
 *  created by Spades <spadesge@gmail.com> 18/2/3
 */
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router/index'

const axiosBaseurl = require('../config').axiosBaseurl

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login') {
        let cookieStart = document.cookie.indexOf('TOKEN=')
        if (cookieStart < 0) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }


})

axios.defaults.baseURL = axiosBaseurl
axios.defaults.withCredentials = true
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})






