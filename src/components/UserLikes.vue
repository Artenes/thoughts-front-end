<template>

    <div class="tall">

        <thoughts
                :busy="busy"
                :thoughts="thoughts"
                :showSearch="true"
                :initialMessage="initialMessage"
                :emptyMessage="emptyMessage"
                :numberOfColumns="2"
                :thoughtDisplay="thoughtsDisplay"
                :searchPlaceholder="'search likes'"
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

        props: ['user'],

        data() {

            const baseUrl = api.userLikesUrl + this.user.data.id;

            return {
                baseUrl: baseUrl,
                api: api,
                thoughts: [],
                pagination: {next: baseUrl},
                busy: false,
                initialMessage: {
                    icon: 'search',
                    message: `Search ${this.user.data.name} likes`
                },
                emptyMessage: {
                    icon: 'frown-o',
                    message: `no likes here`
                },
                thoughtsDisplay: {
                    showBody: true,
                    showAvatar: false,
                    showLikes: true,
                    showTime: true
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

                api.get(this.baseUrl + '?s=' + search).then(function (data) {

                    this.thoughts = data.data;
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>
