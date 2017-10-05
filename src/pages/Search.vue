<template>

    <div class="container">

        <div class="has-text-centered">
            <input class="search-input" type="text" v-model="query" placeholder="search all thoughts">
        </div>

        <results :results="results" :busy="busy" @loadMore="loadMore"></results>

        <div class="has-text-centered has-space" v-show="results.length === 0 && searched && !busy">
            <img src="./../assets/sad.png" alt="Nothing found" class="sad-face">
            <p class="text-brown">Nothing found</p>
        </div>

    </div>

</template>

<script>

    import api from './../utils/api';
    import Results from '@/components/Results';

    export default {

        data() {
            return {
                results: [],
                pagination: {},
                busy: false,
                query: '',
                timeout: null,
                searched: false
            }
        },

        components: {results: Results},

        watch: {

            query(newValue) {

                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {

                    this.search(newValue);

                }.bind(this), 500);

            }

        },

        methods: {

            search(search) {

                this.busy = true;

                this.results = [];
                this.pagination = {};

                api.find(search).then(function (data) {

                    this.results = data.data;
                    this.pagination = data.links;
                    this.busy = false;
                    this.searched = true;

                }.bind(this));

            },

            loadMore() {

                if (this.pagination.next === null)
                    return;

                this.busy = true;

                api.get(this.pagination.next).then(function (data) {

                    this.results = this.results.concat(data.data);
                    this.pagination = data.links;
                    this.busy = false;

                }.bind(this));

            }

        }

    }

</script>

<style>

    .search-input {

        border: none;
        width: 100%;
        height: 50px;
        text-align: center;
        margin-bottom: 5em;
        font-family: inherit;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        box-shadow: #ffbd55 0 10px 30px;

    }

</style>