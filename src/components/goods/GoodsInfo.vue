<template>
    <div class="goodsInfo-container">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
        >
            <div class="ballCart" v-show="ballFlag" ref="ballicon"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbolist="lunbolist" :isFull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsprice.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsprice.market_price }}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsprice.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox :max="goodsprice.stock_quantity" @getGoodsCounts="getSelectCounts"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsprice.goods_no }}</p>
                    <p>库存情况：{{ goodsprice.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsprice.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getGoodsDesc">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getGoodsCommt">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import swiper from '../subcomponments/swiper.vue';
    import numbox from '../subcomponments/goodsNumbox.vue';

    export default {
        name: "GoodsInfo",
        data(){
            return {
                id: this.$route.params.id,
                lunbolist: [],
                goodsprice:{},
                goodsdetail:{},
                ballFlag:false,
                goodsCount: 1
            }
        },
        created(){
          this.getLunboList();
          this.getGoodsPrice();
        },
        methods: {
            getLunboList(){
                this.$http.get('api/getthumimages/'+this.id).then(results => {
                    if(results.body.status === 0){
                        results.body.message.forEach(item => {
                            item.img=item.src;
                        });
                        this.lunbolist = results.body.message;
                    }else{
                        Toast('获取轮播图片失败！');
                    }
                })
            },
            getGoodsPrice(){
                this.$http.get('api/goods/getinfo/'+this.id).then(results => {
                    if(results.body.status === 0){
                        this.goodsprice = results.body.message[0];
                    }else{
                        Toast('获取商品价格失败！');
                    }
                })
            },
            addCart(){
                this.ballFlag=!this.ballFlag;
                console.log(this.goodsCount);
            },
            beforeEnter(el){
                el.style.transform='translate(0,0)';
            },
            enter(el,done){
                //此处调用offset系列才会出现动画过渡效果，咱也不知道为啥
                el.offsetWidth;
                // 获取小球的 在页面中的位置
                const ballPosition = this.$refs.ballicon.getBoundingClientRect();
                // 获取 徽标 在页面中的位置
                const badgePosition = document
                    .getElementById("badge")
                    .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition='all 0.5s ease';
                //此处的done就是afterEnter,表示立即调用，否则会有延迟
                done();
            },
            afterEnter(el){
                this.ballFlag=!this.ballFlag;
            },
            getGoodsDesc(){
                this.$router.push({ name: 'goodsdesc',params:{id: this.id} });
            },
            getGoodsCommt(){
                this.$router.push({ name: 'goodsComments',params:{id: this.id} });
            },
            getSelectCounts(counts){
                this.goodsCount = counts;
            }
        },
        components: {
            'swiper': swiper,
            'numbox': numbox
        }
    }
</script>

<style scoped lang="less">
    .goodsInfo-container {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            .now_price {
                color: red;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .mui-card-footer, .mui-card-header {
            display: block;
            button {
                margin: 10px 0;
            }
        }
        .ballCart {
            width: 16px;
            height: 16px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 408px;
            left: 146px;
            z-index: 9999;
        }
    }
</style>