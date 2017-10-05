<template>

    <div class="thought">

        <div class="thought-body">
            {{ thought.body }}
        </div>

        <div class="thought-footer">

            <p><a href="#"><img :src="thought.user.avatar" :alt="thought.user.name"
                                :title="thought.user.name"></a></p>

            <p><a href="javascript:void(0)" class="has-text-danger"><span class="icon is-large"><i
                    class="fa fa-lg fa-heart-o"></i></span></a></p>

            <p><small>{{ thought.likes }}</small></p>

        </div>

        <p class="time">{{ thought.created_at }}</p>

    </div>

</template>

<script>

    export default {

        props: ['item'],

        data(){
            return {
                thought: this.item
            };
        }

    }

</script>

<style>

    .thought {

        background-color: white;
        box-shadow: #ffbd55 10px 20px 15px;
        padding: 5em;
        border-radius: 10px;
        text-align: center;
        border-top: solid 10px #ffbd55;

    }

    .thought:hover {

        position: relative;
        top: -5px;
        left: -5px;
        border-top: solid 10px #9381ff;

    }

    .thought-body {

        margin-bottom: 1em;

    }

    .thought-footer img {

        width: 40px;
        height: 40px;
        border-radius: 50%;

    }

    .time {

        font-size: 0.6em;

    }

</style>