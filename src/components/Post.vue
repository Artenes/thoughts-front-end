<template>

    <div class="has-text-centered center">

        <form style="width: 100%" @submit="post">
            <input ref="input" class="input-cta" type="text" placeholder="type your thought here and press enter"
                   v-model="thought" maxlength="140">
            <small>{{left}} characters left</small>
        </form>

    </div>

</template>

<script>

    export default {

        data() {
            return {
                thought: ''
            }
        },

        mounted() {

            this.$refs.input.focus();

        },

        computed: {

            left() {

                return 140 - this.thought.length;

            }

        },

        methods: {

            post(e) {

                e.preventDefault();

                if(!this.thought) {

                    alert('Think of something first!');
                    return;

                }

                this.$emit('postThought', this.thought);

            }

        }

    }

</script>