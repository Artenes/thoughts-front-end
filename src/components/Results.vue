<template>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false" infinite-scroll-throttle-delay="1000" infinite-scroll-distance="150">

        <div class="columns" v-for="result in results">

            <div class="column is-half is-offset-one-quarter">

                <thought :item="result"></thought>

            </div>

        </div>

        <div class="has-text-centered" v-show="busy">
            <img src="./../assets/loading.svg">
        </div>

    </div>

</template>

<script>

    const infiniteScroll = require('vue-infinite-scroll');
    import Thought from '@/components/Thought';

    export default {

        components: {thought: Thought},

        props: ['results', 'busy'],

        directives: {infiniteScroll},

        methods: {

            loadMore() {

                this.$emit('loadMore');

            }

        }

    }

</script>
