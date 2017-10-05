<template>

    <div class="container">

        <thoughts :thoughts="thoughts" :busy="busy" @loadMore="loadMore"></thoughts>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Thoughts from '@/components/Thoughts';

    export default {

        data() {
            return{
                thoughts: [],
                pagination: { next: api.popularUlr },
                busy: false
            }
        },

        components: {thoughts: Thoughts},

        mounted() {

            this.loadMore();

        },

        methods: {

            loadMore() {

                this.busy = true;

                if(this.pagination.next === null)
                    return this.busy = false;

                api.get(this.pagination.next).then(function (data) {

                    this.thoughts = this.thoughts.concat(data.data);
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>