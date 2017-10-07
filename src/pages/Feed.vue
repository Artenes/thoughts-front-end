<template>

    <div class="container tall">

        <thoughts :url="api.feedUlr" icon="commenting-o" info="When you start following someone, their thoughts will appear here"></thoughts>

    </div>

</template>

<script>

    import api from '@/utils/api';
    import Thoughts from '@/components/Thoughts';

    export default {

        components: {thoughts: Thoughts},

        data(){
            return {
                api: api
            };
        }

    }

</script>