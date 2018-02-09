import Vue from 'vue'
import Router from 'vue-router'
import PenStat from '@/PenStat.vue'
import VisitStat from '@/VisitStat.vue'
import Inform from '@/Inform.vue'
import Login from '@/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            components: {
                default: VisitStat,
                inform: Inform
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login

        }, {
            path: '/penstat',
            name: 'PenStat',
            component: PenStat
        }
    ]
})
