<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value="1" @change="getCounts" ref="numboxitem">
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js';

    export default {
        name: "goodsNumbox",
        mounted(){
            //初始化输入框
            mui('mui-numbox').numbox();
        },
        props:['max'],
        methods:{
            getCounts(){
                this.$emit('getGoodsCounts',parseInt(this.$refs.numboxitem.value));
            }
        },
        watch: {
            max: function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        }
    }
</script>

<style scoped>

</style>