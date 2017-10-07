<template>

    <div class="container tall navbar-space">

        <thoughts
                :busy="busy"
                :thoughts="thoughts"
                :initialMessage="initialMessage"
                @loadMore="loadMore">

        </thoughts>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Thoughts from '@/components/Thoughts';

    export default {

        components: {thoughts: Thoughts},

        data() {
            return{
                api: api,
                thoughts: [],
                pagination: {next: api.feedUlr},
                busy: false,
                initialMessage: {
                    icon: 'commenting-o',
                    message: 'When you start following someone, their thoughts will appear here'
                }
            }
        },

        methods: {

            loadMore() {

                if(!this.pagination.next)
                    return;

                this.busy = true;

                api.get(this.pagination.next).then(function (data) {

                    this.thoughts = this.thoughts.concat(data.data);
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>
