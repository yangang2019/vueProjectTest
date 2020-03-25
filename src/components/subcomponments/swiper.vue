<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbolist" :key="item.id" >
            <img :src="item.id==2?'http://www.itcast.cn/subject/webzly/images/2.jpg':item.img" :class="{ full: isFull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name: "swiper",
        props:['lunbolist','isFull']
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;
            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
    .full {
        width: 100%;
    }
</style>