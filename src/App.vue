<template>

    <div class="tall">

        <navbar></navbar>

        <router-view></router-view>

    </div>

</template>

<script>

    import Navbar from '@/components/Navbar';

    export default {

        name: 'app',

        components: {navbar: Navbar}

    }

</script>

<style lang="css">

    @import "../node_modules/bulma/css/bulma.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    html, body {
        background-color: #ffd571;
        font-family: "Montserrat Alternates", sans-serif;
        position: static;
        margin-top: 3em;
        width: 100%;
    }

    html {

        height: 85%;

    }

    body {

        height: 100%;

    }

    .is-brand {
        font-size: 1.3em;
        text-decoration: underline;
        font-family: Alegreya, sans-serif;
    }

    .vline {
        background-color: #a6a6a6;
        width: 1px;
    }

    .has-space {

        padding-top: 3em;
        padding-bottom: 10em;
        text-align: center;

    }

    .loading {

        display: block;
        text-align: center;

    }

    .sad-face {

        width: 100px;
        height: 100px;

    }

    .text-brown {

        color: #732A0B;

    }

    .center {

        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;

    }

    .tall {

        height: 100%;

    }

    span.icon {

        margin-bottom: 1em;

    }

    .round {

        border-radius: 50%;

    }

    .tags {

        justify-content: center;

    }

</style>
