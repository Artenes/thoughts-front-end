<template>

    <div class="tall">

        <div class="columns tall">

            <div class="column is-2 center profile tall navbar-space">

                <div class="has-text-centered" v-if="!busy">

                    <img class="round user-avatar" :src="user.data.avatar" alt="">
                    <p>{{ user.data.name }}</p>
                    <small>{{ user.data.username }}</small>
                    <hr>
                    <follow :user="user" class="followers"></follow>
                </div>
                <div class="has-text-centered" v-else>
                    <img src="./../assets/loading.svg">
                </div>

            </div>

            <div class="column is-10 navbar-space thoughts">

                <div class="tabs is-centered">
                    <ul>
                        <li v-bind:class="{'is-active' : tab == 'thoughts'}" @click="tab = 'thoughts'"><a>Thoughts</a></li>
                        <li v-bind:class="{'is-active' : tab == 'likes'}" @click="tab = 'likes'"><a>Likes</a></li>
                    </ul>
                </div>

                <user-thoughts v-if="user.data.id" v-show="tab == 'thoughts'" :user="user"></user-thoughts>

                <user-likes v-if="user.data.id" v-show="tab == 'likes'" :user="user"></user-likes>

            </div>

        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Follow from '@/components/Follow';
    import UserThoughts from '@/components/UserThoughts';
    import UserLikes from '@/components/UserLikes';

    export default {

        components: {follow: Follow, 'user-thoughts': UserThoughts, 'user-likes': UserLikes},

        data() {
            return {
                tab: 'thoughts',
                busy: false,
                followBusy: false,
                user: {
                    data: {name: null},
                    meta: {following: false},
                }
            };
        },

        watch: {

            '$route'(to) {

                this.fetchUser(to.params.username);

            }

        },

        mounted() {

            this.fetchUser(this.$router.currentRoute.params.username);

        },

        methods: {

            fetchUser(username = null) {

                this.user.data.id = false;
                this.tab = 'thoughts';

                this.busy = true;

                api.user(username).then(function (user) {

                    this.user = user;

                    this.busy = false;

                }.bind(this));

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

    .profile {

        background-color: #ffcf5d;
        box-shadow: #ffbd55 10px 10px 10px;

    }

    .thoughts {

        padding-left: 1em;
        padding-right: 1em;

    }

    .tabs li.is-active a {

        color: #772A00;
        border-bottom-color: #772A00;

    }

    .tabs a {

        color: #e5aa4c;
        border-bottom-color: #e5aa4c;
        font-weight: bolder;

    }

    .tabs ul {

        border-bottom-color: #FFBD55;

    }

</style>
