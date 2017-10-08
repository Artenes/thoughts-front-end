<template>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false"
         infinite-scroll-throttle-delay="1000" infinite-scroll-distance="500">

        <div v-if="showSearch" class="has-text-centered">
            <input class="input-cta" type="text" v-model="query" :placeholder="searchPlaceholder">
        </div>

        <div class="columns" v-for="set in chunk">

            <div class="column" v-for="thought in set">

                <thought :item="thought" :displayOptions="thoughtDisplay"></thought>

            </div>

        </div>

        <div class="has-text-centered" v-show="busy">
            <img src="./../assets/loading.svg">
        </div>

        <div v-if="thoughts.length == 0 && !busy && !searched" class="center">
            <span class="icon is-large">
                <i :class="'fa fa-3x fa-' + initialMessage.icon"></i>
            </span>
            <p>{{ initialMessage.message }}</p>
        </div>

        <div v-if="thoughts.length == 0 && !busy && searched" class="has-text-centered">
            <span class="icon is-large">
                <i :class="'fa fa-3x fa-' + emptyMessage.icon"></i>
            </span>
            <p>{{ emptyMessage.message }}</p>
        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';

    const infiniteScroll = require('vue-infinite-scroll');
    import Thought from '@/components/Thought';

    export default {

        components: {thought: Thought},

        props: {

            busy: {
                type: Boolean,
                required: true,
                default: false
            },

            thoughts: {
                type: Array,
                required: true,
                default: function () {
                    return [];
                }
            },

            initialMessage: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        icon: 'commenting-o',
                        message: 'Here lies some thoughts'
                    };
                }
            },

            emptyMessage: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        icon: 'frown-o',
                        message: 'No one is thinking about this'
                    };
                }
            },

            showSearch: {
                type: Boolean,
                required: false,
                default: false
            },

            searchPlaceholder: {
                type: String,
                required: false,
                default: 'search thoughts'
            },

            numberOfColumns: {
                type: Number,
                required: false,
                default: 3
            },

            thoughtDisplay: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        showBody: true,
                        showAvatar: true,
                        showLikes: true,
                        showTime: true
                    };
                }
            }

        },

        directives: {infiniteScroll},

        data() {
            return {
                query: '',
                timeout: null,
                searched: false
            };
        },

        mounted() {

            this.loadMore();

        },

        watch: {

            query(newValue) {

                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {

                    this.search(newValue);

                }.bind(this), 500);

            }

        },

        computed: {

            chunk() {

                let start, end, chunk = this.numberOfColumns;

                let chunked = [];

                for (start = 0, end = this.thoughts.length; start < end; start += chunk) {

                    chunked.push(this.thoughts.slice(start, start + chunk));

                }

                return chunked;

            },

        },

        methods: {

            loadMore() {

                this.$emit('loadMore');

            },

            search(search) {

                this.searched = true;

                this.$emit('search', search);

            },

        }

    }

</script>

<style scoped>

    .icon {
        margin-bottom: 1em;
    }

</style>