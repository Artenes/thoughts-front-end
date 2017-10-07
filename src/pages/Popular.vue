<template>

    <div class="container tall">

        <thoughts :url="api.popularUlr" icon="start-o" info="No one thought about popularity"></thoughts>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Thoughts from '@/components/Thoughts';

    export default {

        components: {thoughts: Thoughts},

        data() {
            return{
                api: api
            }
        }

    }

</script>