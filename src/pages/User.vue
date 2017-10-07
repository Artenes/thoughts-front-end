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

                <user-thoughts v-if="user.data.id" :user="user"></user-thoughts>

            </div>

        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Follow from '@/components/Follow';
    import UserThoughts from '@/components/UserThoughts';

    export default {

        components: {follow: Follow, 'user-thoughts': UserThoughts},

        data() {
            return {
                busy: false,
                followBusy: false,
                user: {
                    data: {name: null},
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

</style>