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

                <router-link to="/" class="navbar-item" v-bind:class="{'navbar-active': current == 'latest'}">Latest</router-link>

                <router-link to="/popular" class="navbar-item" v-bind:class="{'navbar-active': current == 'popular'}">Popular</router-link>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'feed'}">Feed</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'me'}">Me</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'pseudonym'}">Pseudonym</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'search'}">Search</a>

            </div>

        </div>

    </nav>

</template>

<script>

    export default {

        data() {
            return {
                current: 'latest',
                showMenu: false
            }
        },

        mounted() {

            this.current = this.$router.currentRoute.name;

        },

        watch: {

            '$route' (to, from) {

                this.current = to.name;
                this.showMenu = false;

            }

        },

        methods: {

            toggleMenu(){
                this.showMenu = !this.showMenu;
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