import Vue from 'vue'
import App from './App'
import router from './router'
import auth from '@/utils/auth';

Vue.config.productionTip = false

const protectedRoutes = ['feed', 'me', 'pseudonym'];

router.beforeEach((to, from, next) => {

    if (!auth.check() && protectedRoutes.includes(to.name))
        return next('/');

    return next();

});

auth.onLogout(function () {

    router.push('/');

});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
