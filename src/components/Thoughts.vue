<template>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false" infinite-scroll-throttle-delay="1000" infinite-scroll-distance="150">

        <div class="columns" v-for="set in chunk">

            <div class="column" v-for="thought in set">

                <div class="thought">

                    <div class="thought-body">
                        {{ thought.body }}
                    </div>

                    <div class="thought-footer">

                        <p><a href="#"><img :src="thought.user.avatar" :alt="thought.user.name"
                                            :title="thought.user.name"></a></p>

                        <p><a href="javascript:void(0)" class="has-text-danger"><span class="icon is-large"><i
                                class="fa fa-lg fa-heart-o"></i></span></a></p>

                        <small>{{ thought.likes }}</small>

                    </div>

                </div>

            </div>

        </div>

        <div class="has-text-centered" v-show="busy">
            <img src="./../assets/loading.svg">
        </div>

    </div>

</template>

<script>

    const infiniteScroll = require('vue-infinite-scroll');

    export default {

        props: ['thoughts', 'busy'],

        directives: {infiniteScroll},

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

                this.$emit('loadMore');

            }

        }

    }

</script>

<style>

    .thought {

        background-color: white;
        box-shadow: #ffbd55 10px 20px 15px;
        padding: 5em;
        border-radius: 10px;
        text-align: center;
        border-top: solid 10px #ffbd55;

    }

    .thought:hover {

        position: relative;
        top: -5px;
        left: -5px;

    }

    .thought-body {

        margin-bottom: 1em;

    }

    .thought-footer img {

        width: 40px;
        height: 40px;
        border-radius: 50%;

    }



</style>
