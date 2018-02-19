import Vue from 'vue'
import Router from 'vue-router'
import {Pagination} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import PenStat from '@/PenStat.vue'
import VisitStat from '@/VisitStat.vue'
import Inform from '@/Inform.vue'
import Login from '@/Login.vue'
import Header from '@/Header.vue'


Vue.use(Router)
Vue.use(Pagination)
export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            components: {
                default: VisitStat,
                header: Header,
                inform: Inform
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login

        }, {
            path: '/penstat',
            name: 'PenStat',
            components: {
                default: PenStat,
                header: Header
            }
        }
    ]
})
