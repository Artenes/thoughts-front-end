<template>

    <div class="container tall">

        <thoughts :url="api.latestUlr" icon="clock-o" info="I guess no one likes to think"></thoughts>

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