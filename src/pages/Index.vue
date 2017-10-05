<template>

    <div class="container">

        <thoughts :thoughts="thoughts"></thoughts>

    </div>

</template>

<script>

    import axios from 'axios';
    import Thoughts from '@/components/Thoughts';

    export default {

        data() {
            return{
                thoughts: []
            }
        },

        components: {thoughts: Thoughts},

        mounted() {

            axios.get('http://api.thought.dev/v1/thoughts').then(function (response) {

                this.thoughts = response.data.data;

            }.bind(this));

        }

    }

</script>