<template>
    <div>
        <!--轮播图组件-->
        <swiper :lunbolist="lunbotuList" :isFull="true"></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    //引入轮播图子组件
    import swiper from '../subcomponments/swiper.vue';

    export default {
        name: "HomeContainer",
        data(){
            return { lunbotuList: [] };
        },
        created(){
            this.getLunboList();
        },
        methods:{
            getLunboList(){
                this.$http.get('api/getlunbo').then(result => {
                    if(result.body.status === 0){
                        // 成功了
                        this.lunbotuList = result.body.message;
                    }else {
                        // 成功了
                        Toast('获取轮播图失败！');
                    }
                })
            }
        },
        components: {
            'swiper': swiper
        }
    }
</script>

<style scoped lang="less">
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
        img {
            width: 60px;
            height: 60px;
        }
        .mui-table-view-cell {
            border: none;
        }
    }
</style>