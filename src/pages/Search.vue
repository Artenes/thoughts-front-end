<template>

    <div class="container tall">

        <thoughts
                :busy="busy"
                :thoughts="thoughts"
                :showSearch="true"
                :initialMessage="initialMessage"
                :numberOfColumns="1"
                @loadMore="loadMore"
                @search="search">

        </thoughts>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Thoughts from '@/components/Thoughts';

    export default {

        components: {thoughts: Thoughts},

        data() {
            return {
                api: api,
                thoughts: [],
                pagination: {},
                busy: false,
                initialMessage: {
                    icon: 'search',
                    message: 'Search for some thoughts'
                }
            }
        },

        methods: {

            loadMore() {

                if (!this.pagination.next)
                    return;

                this.busy = true;

                api.get(this.pagination.next).then(function (data) {

                    this.thoughts = this.thoughts.concat(data.data);
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            },

            search(search) {

                this.busy = true;

                this.thoughts = [];
                this.pagination = {};

                api.find(search).then(function (data) {

                    this.thoughts = data.data;
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>
