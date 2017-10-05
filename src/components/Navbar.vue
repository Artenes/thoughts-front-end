<template>

    <nav class="navbar">

        <div class="navbar-brand">

            <p class="navbar-item is-brand">Thoughts</p>

            <div class="navbar-burger burger" data-target="navMenuTransparentExample" @click="showMenu = !showMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

        <div class="navbar-menu" v-bind:class="{'is-active': showMenu}">

            <div class="navbar-start">

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'latest'}" @click="changeTab('latest')" href="#">Latest</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'popular'}" @click="changeTab('popular')" href="#">Popular</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'feed'}" @click="changeTab('feed')" href="#">Feed</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'me'}" @click="changeTab('me')" href="#">Me</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'pseudonym'}" @click="changeTab('pseudonym')" href="#">Pseudonym</a>

                <a class="navbar-item" v-bind:class="{'navbar-active': current == 'search'}" @click="changeTab('search')" href="#">Search</a>

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

        methods: {

            changeTab(newTab) {
                this.current = newTab;
                this.toggleMenu();
            },

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