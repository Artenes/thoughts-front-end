import Vue from 'vue'
import Router from 'vue-router'
//Pages
import Latest from '@/pages/Latest'
import Popular from '@/pages/Popular'
import Search from '@/pages/Search'
import Feed from '@/pages/Feed'
import User from '@/pages/User'
import Me from '@/pages/Me'
import Pseudonym from '@/pages/Pseudonym'
import PostThought from '@/pages/PostThought'

Vue.use(Router);

export default new Router({
    routes: [

        {path: '/', name: 'latest', component: Latest},
        {path: '/popular', name: 'popular', component: Popular},
        {path: '/search', name: 'search', component: Search},
        {path: '/feed', name: 'feed', component: Feed},
        {path: '/user/:username', name: 'user', component: User},
        {path: '/me', name: 'me', component: Me},
        {path: '/pseudonym', name: 'pseudonym', component: Pseudonym},
        {path: '/post', name: 'post', component: PostThought}

    ]
})
