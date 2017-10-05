<template>

    <nav class="navbar">

        <div class="navbar-brand">

            <p class="navbar-item is-brand">Thoughts</p>

            <div class="navbar-burger burger" data-target="navMenuTransparentExample" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

        <div class="navbar-menu" v-bind:class="{'is-active': showMenu}">

            <div class="navbar-start">

                <router-link to="/" class="navbar-item" v-bind:class="{'navbar-active': current == 'latest'}">Latest
                </router-link>

                <router-link to="/popular" class="navbar-item" v-bind:class="{'navbar-active': current == 'popular'}">
                    Popular
                </router-link>

                <router-link to="/search" class="navbar-item" v-bind:class="{'navbar-active': current == 'search'}">
                    Search
                </router-link>

                <a class="navbar-item is-hidden-desktop" v-bind:class="{'navbar-active': current == 'enter'}"
                   v-show="!isLogedIn">Log in</a>

            </div>

        </div>

        <div class="navbar-end">

            <a class="navbar-item is-hidden-mobile" v-bind:class="{'navbar-active': current == 'feed'}" v-show="isLogedIn">Feed</a>

            <a class="navbar-item is-hidden-mobile" v-bind:class="{'navbar-active': current == 'me'}" v-show="isLogedIn">Me</a>

            <a class="navbar-item is-hidden-mobile" v-bind:class="{'navbar-active': current == 'pseudonym'}"
               v-show="isLogedIn">Pseudonym</a>

            <a class="navbar-item is-hidden-mobile" v-bind:class="{'navbar-active': current == 'me'}" v-show="isLogedIn" @click="logOut">Exit</a>

            <a class="navbar-item is-hidden-mobile" v-bind:class="{'navbar-active': current == 'enter'}"
               v-show="!isLogedIn && !busy" @click="logIn">Log in</a>

            <a class="navbar-item has-text-centered" v-show="busy">
                <img src="./../assets/loading.svg">
            </a>

        </div>

    </nav>

</template>

<script>

    import auth from './../utils/auth';
    import facebook from './../utils/social-login/facebook';

    export default {

        data() {
            return {
                current: 'latest',
                showMenu: false,
                isLogedIn: false,
                busy: false
            }
        },

        mounted() {

            this.current = this.$router.currentRoute.name;
            this.isLogedIn = auth.check();

            auth.onLogin(() => {
                this.isLogedIn = true;
            });
            auth.onLogout(() => {
                this.isLogedIn = false;
            });

            facebook.init();

        },

        watch: {

            '$route'(to, from) {

                this.current = to.name;
                this.showMenu = false;

            }

        },

        methods: {

            toggleMenu() {
                this.showMenu = !this.showMenu;
            },

            logIn() {

                this.busy = true;

                auth.login().then(function () {

                    this.busy = false;

                }.bind(this));

            },

            logOut() {

                auth.logout();

            }

        }

    }

</script>

<style>

    .navbar {
        background-color: #ffd571;
        box-shadow: #ffbd55 0 10px 30px;
        color: #772a00;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
    }

    .navbar-item {
        color: inherit;
    }

    .navbar-active {
        background-color: #fcbb54;
        color: white;
    }

    .navbar.is-transparent a.navbar-item:hover {
        color: white;
        background-color: #fcbb54;
    }

    a.navbar-item:hover {
        color: white;
        background-color: #fcbb54;
    }

</style>