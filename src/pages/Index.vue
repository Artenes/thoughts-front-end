<template>

    <div class="container">

        <thoughts :thoughts="thoughts" :busy="busy" @loadMore="loadMore"></thoughts>

    </div>

</template>

<script>

    import axios from 'axios';
    import Thoughts from '@/components/Thoughts';

    export default {

        data() {
            return{
                thoughts: [],
                pagination: {
                    next: 'http://api.thought.dev/v1/thoughts'
                },
                busy: false
            }
        },

        components: {thoughts: Thoughts},

        mounted() {

            this.loadMore();

        },

        methods: {

            loadMore() {

                this.busy = true;

                if(this.pagination.next === null)
                    return this.busy = false;

                axios.get(this.pagination.next).then(function (response) {

                    this.thoughts = this.thoughts.concat(response.data.data);
                    this.pagination = response.data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>