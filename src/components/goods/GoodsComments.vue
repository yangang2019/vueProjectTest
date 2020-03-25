<template>
    <cmt-box :newsid="id"></cmt-box>
</template>

<script>
    import comnents from '../subcomponments/comments.vue';

    export default {
        name: "GoodsComments",
        data(){
            return {
                id: this.$route.params.id
            }
        },
        components: {
            'cmt-box': comnents
        }
    }
</script>

<style scoped>

</style>