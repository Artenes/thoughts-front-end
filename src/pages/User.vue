<template>

    <div class="tall">

        <div class="columns tall">

            <div class="column is-2 center profile">

                <div class="has-text-centered" v-if="!busy">

                    <img class="round user-avatar" :src="user.data.avatar" alt="">
                    <p>{{ user.data.name }}</p>
                    <small>{{ user.data.username }}</small>
                    <hr>
                    <div class="followers">
                        <p>{{ user.data.followers }}</p>
                        <p>Followers</p>
                    </div>
                    <span class="icon is-large follow has-text-info" title="follow" @click="follow">
                        <i class="fa fa-lg"
                           v-bind:class="{'fa-plus-square-o': !user.meta.following, 'fa-plus-square': user.meta.following}">
                        </i>
                    </span>

                </div>
                <div class="has-text-centered" v-else>
                    <img src="./../assets/loading.svg">
                </div>

            </div>

            <div class="column is-10">

            </div>

        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';

    export default {

        data() {
            return {
                busy: false,
                user: {
                    data: {name: 'loading'},
                    meta: {following: false},
                }
            };
        },

        mounted() {

            this.busy = true;

            api.user(this.$router.currentRoute.params.username).then(function (user) {

                this.user = user;

                this.busy = false;

            }.bind(this));

        },

        methods: {

            follow() {

                this.user.meta.following = !this.user.meta.following;
                this.user.data.followers = this.user.meta.following ? this.user.data.followers + 1 : this.user.data.followers - 1;

            }

        }

    }

</script>

<style scoped>

    hr {
        background-color: #772a00;
        width: 50%;
        margin: auto;
        margin-top: 1em;

    }

    .user-avatar {

        margin-bottom: 1em;

    }

    .followers {

        margin-top: 1em;
        font-size: 1em;

    }

    .follow {

        cursor: pointer;

    }

    .profile {

        position: absolute;
        left: 0;
        top: 0;
        background-color: #ffcf5d;
        box-shadow: #ffbd55 10px 0 10px;

    }

</style>