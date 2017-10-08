<template>

    <user v-if="user" :user="user" :busy="busy" :allowPseudonym="true"></user>

</template>

<script>

    import User from '@/components/User';
    import api from '@/utils/api';
    import auth from '@/utils/auth';

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

            api.user(auth.pseudonym().username).then(function (user) {

                this.user = user;

                this.busy = false;

            }.bind(this));

        }

    }

</script>
