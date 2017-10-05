import Vue from 'vue'
import Router from 'vue-router'
//Pages
import Latest from '@/pages/Latest'
import Popular from '@/pages/Popular'

Vue.use(Router);

export default new Router({
    routes: [

        {path: '/', name: 'latest', component: Latest},
        {path: '/popular', name: 'popular', component: Popular}

    ]
})
