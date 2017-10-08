<template>

    <div class="container center navbar-space">

        <div v-show="!user" class="has-text-centered children-space">
            <span class="icon is-large">
                <i class="fa fa-3x fa-commenting-o"></i>
            </span>
            <p>Login to post your thoughts</p>
            <p><button class="button is-outlined is-black" @click="login">Log in</button></p>
        </div>

        <post v-if="user" @postThought="postThought"></post>

    </div>

</template>

<script>

    import Post from '@/components/Post';
    import auth from '@/utils/auth';
    import api from '@/utils/api';

    export default {

        components: {post: Post},

        data() {
            return {
                user: null
            };
        },

        mounted() {

            this.user = auth.user();

            auth.onLogin((user) => { this.user = user; });
            auth.onLogout(() => { this.user = null; });

        },

        methods: {

            login() {

                auth.login();

            },

            postThought(thought) {

                api.postThought(thought).then(() => {

                    this.$router.push('/');

                }).catch((error) => {

                    console.log(error);

                });

            }

        }

    }

</script>
