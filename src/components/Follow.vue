<template>

    <div>

        <p>{{ followers }}</p>
        <p>Followers</p>
        <div v-if="!busy">
            <span class="icon is-large follow has-text-info" title="follow" @click="follow" v-if="isLogedIn">
                <i class="fa fa-lg"
                   v-bind:class="{'fa-plus-square-o': !following, 'fa-plus-square': following}">
                </i>
            </span>
        </div>
        <div class="has-text-centered" v-else>
            <img src="./../assets/loading.svg" class="small">
        </div>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import auth from '@/utils/auth';

    export default {

        props: ['user'],

        data() {
            return {
                isLogedIn: false,
                busy: false,
                followers: this.user.data.followers,
                following: this.user.meta.following
            }
        },

        mounted() {

            this.isLogedIn = auth.check();

            auth.onLogin(() => {
                this.isLogedIn = true;
            });
            auth.onLogout(() => {
                this.isLogedIn = false;
            });

        },

        methods: {

            follow() {

                this.busy = true;

                api.toggleFollow(this.user.data.id).then(function () {

                    this.following = !this.following;
                    this.followers = this.following ? this.followers + 1 : this.followers - 1;
                    this.busy = false;

                }.bind(this)).catch(function () {

                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>

<style scoped>

    .follow {

        cursor: pointer;

    }

</style>