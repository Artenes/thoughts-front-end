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

            this.busy = true;

            api.user().then(function (user) {

                this.user = user;

                this.busy = false;

            }.bind(this));

        }

    }

</script>
