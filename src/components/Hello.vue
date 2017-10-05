<template>
    <div class="hello">

        <div class="columns" v-for="thought in thoughts">
            <div class="column">{{ thought.body }}</div>
        </div>

    </div>
</template>

<script>

    import axios from 'axios';

    export default {

        name: 'hello',

        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                thoughts: []
            }
        },

        mounted() {

            axios.get('http://api.thought.dev/v1/thoughts').then(function (response) {

                this.thoughts = response.data.data;

            }.bind(this));

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
