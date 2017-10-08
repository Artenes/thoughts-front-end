<template>

    <user :user="user" :busy="busy"></user>

</template>

<script>

    import User from '@/components/User';
    import api from '@/utils/api';

    export default {

        components: {user: User},

        data() {
            return {
                user: null,
                busy: false
            };
        },

        mounted() {

            this.fetchUser(this.$router.currentRoute.params.username);

        },

        watch: {

            '$route'(to) {

                this.user.data.id = false;
                this.fetchUser(to.params.username);

            }

        },

        methods: {

            fetchUser(username = null) {

                this.busy = true;

                api.user(username).then(function (user) {

                    this.user = user;

                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>
