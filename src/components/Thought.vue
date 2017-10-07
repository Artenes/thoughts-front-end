<template>

    <div class="thought">

        <div class="thought-body">
            {{ thought.body }}
        </div>

        <div class="thought-footer">

            <p>
                <router-link :to="'/user/' + thought.user.username">
                    <img :src="thought.user.avatar" :alt="thought.user.name" :title="thought.user.name">
                </router-link>
            </p>

            <p v-show="!busy" class="likes">

                <a href="javascript:void(0)" class="has-text-danger" @click="toggleLike">
                    <span class="icon">
                        <i class="fa fa-lg"
                           v-bind:class="{'fa-heart-o': !thought.meta.was_liked, 'fa-heart': thought.meta.was_liked}">
                        </i>
                    </span>
                </a>

                <small style="display: block">{{ thought.likes }}</small>

            </p>

            <div class="has-text-centered" v-show="busy">
                <img src="./../assets/loading.svg">
            </div>

        </div>

        <p class="time">{{ thought.created_at }}</p>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import auth from '@/utils/auth';

    export default {

        props: ['item'],

        data() {
            return {
                thought: this.item,
                busy: false,
                isLogedIn: false
            };
        },

        mounted() {

            this.isLogedIn = auth.check();

            auth.onLogin(function () { this.isLogedIn = true; }.bind(this));
            auth.onLogout(function () { this.isLogedIn = false; }.bind(this));

        },

        methods: {

            toggleLike() {

                this.busy = true;

                api.toggleLike(this.thought.id).then(function () {

                    this.thought.meta.was_liked = !this.thought.meta.was_liked;
                    this.thought.likes = this.thought.meta.was_liked ? this.thought.likes + 1 : this.thought.likes - 1;
                    this.busy = false;

                }.bind(this)).catch(function () {

                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>

<style scoped>

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
        border-top: solid 10px #9381ff;

    }

    .thought-body {

        margin-bottom: 1em;

    }

    .thought-footer img {

        width: 40px;
        height: 40px;
        border-radius: 50%;

    }

    .time {

        font-size: 0.6em;

    }

    .likes {

        margin-bottom: 1em;
        margin-top: 1em;

    }

</style>