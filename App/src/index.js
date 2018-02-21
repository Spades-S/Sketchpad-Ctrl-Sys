/***
 *  created by Spades <spadesge@gmail.com> 18/2/3
 */
import Vue from 'vue'
import App from './App'
import router from './router/index'


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


new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})






