<template>
    <div class="goods-container">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="postGoodsInfo(item.id)">
            <img :src="item.img_url">
            <h1>{{ item.title }}</h1>
            <div class="goods-info">
                <div class="goods-price">
                    <span class="now">¥{{ item.sell_price }}</span>
                    <span class="old">¥{{ item.market_price }}</span>
                </div>
                <div class="goods-detail">
                    <span class="hotsell">热卖中</span>
                    <span class="extra">剩{{ item.stock_quantity }}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "GoodsLists",
        data(){
            return {
                goodslist: [],
                pageIndex: 1
            }
        },
        created(){
            this.getGoodslist();
        },
        methods:{
            getGoodslist(){
                this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result => {
                    if(result.body.status === 0){
                        this.goodslist=this.goodslist.concat(result.body.message);
                    }else{
                        Toast('获取商品列表失败！');
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodslist();
            },
            postGoodsInfo(id){
                //编程时路由
                // console.log(this);
                this.$router.push({ name: "goodsinfo", params: { id: id } });
            }
        }
    }
</script>

<style scoped lang="less">
    .goods-container{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            margin: 4px 0;
            -webkit-box-shadow: 0 0 10px #ccc;
            -moz-box-shadow: 0 0 10px #ccc;
            box-shadow: 0 0 10px #ccc;
            padding:2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 256px;
            img {
                width: 100%;
            }
            h1 {
                font-size: 14px;
            }
            .goods-info {
                background-color: #eee;
                div {
                    margin: 0;
                    padding: 5px;
                }
                .goods-price {
                    .now {
                        color: red;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .old {
                        color: #ccc;
                        font-size: 14px;
                        text-decoration: line-through;
                        margin-left: 10px;
                    }
                }
                .goods-detail {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #999;
                }
            }
            
        }
    }
</style>