<template>

    <div class="tall" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false" infinite-scroll-throttle-delay="1000" infinite-scroll-distance="150">

        <div class="columns" v-for="set in chunk">

            <div class="column" v-for="thought in set">

                <thought :item="thought"></thought>

            </div>

        </div>

        <div class="has-text-centered" v-show="busy">
            <img src="./../assets/loading.svg">
        </div>

        <div v-if="thoughts.length == 0 && !busy" class="center">
            <span class="icon is-large">
                <i :class="'fa fa-3x fa-' + icon"></i>
            </span>
            <p>{{ info }}</p>
        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';
    const infiniteScroll = require('vue-infinite-scroll');
    import Thought from '@/components/Thought';

    export default {

        components: {thought: Thought},

        props: ['url', 'icon', 'info'],

        directives: {infiniteScroll},

        data() {
            return {
                thoughts: [],
                busy: false,
                pagination: { next: this.url }
            };
        },

        mounted() {

            this.loadMore();

        },

        computed: {

            chunk() {

                let start, end, chunk = 3;

                let chunked = [];

                for (start = 0, end = this.thoughts.length; start < end; start += chunk) {

                    chunked.push(this.thoughts.slice(start, start + chunk));

                }

                return chunked;

            },

        },

        methods: {

            loadMore() {

                this.busy = true;

                if(this.pagination.next === null)
                    return this.busy = false;

                api.get(this.pagination.next).then(function (data) {

                    this.thoughts = this.thoughts.concat(data.data);
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>
