<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' style="height: 20px;">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value="goodsItemcounts" @change="getCounts" ref="numboxitem">
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js';

    export default {
        name: "carNumbox",
        mounted(){
            //初始化输入框
            mui('.mui-numbox').numbox();
        },
        methods:{
            getCounts(){
                var goodsinfo={
                    id: this.id,
                    counts: this.$refs.numboxitem.value
                };
                this.$store.commit('updateGoodscount',goodsinfo);
            }
        },
        props:['goodsItemcounts','id']
    }
</script>

<style scoped>

</style>