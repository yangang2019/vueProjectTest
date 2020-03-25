<template>
    <div class="goodsList">
            <div class="mui-card" v-for="(item,i) in goodscar" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner goodsCar">
                        <mt-switch v-model="$store.getters.getSelectedStatus[item.id]" @change="selectedStatus(item.id, $store.getters.getSelectedStatus[item.id])"></mt-switch>
                        <img src="http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg" alt="">
                        <div class="goodsInfo">
                            <h1 class="title">{{ item.title }}</h1>
                            <div class="opts">
                                <span class="price">¥{{ item.sell_price }}</span>
                                <numbox :id="item.id" :goodsItemcounts="$store.getters.getSingleGoodscount[item.id]"></numbox>
                                <a href="javascript:;" class="delbtn" @click.prevent="delGoods(item.id,i)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner goods-counts">
                        <div class="count-info">
                            <p>总计（不含运费）</p>
                            <p>已选购商品&nbsp;<span>{{ $store.getters.getSelectedGoods }}</span>&nbsp;件，总价：<span>¥{{ $store.getters.getAllGoodsPrice }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import numbox from '../subcomponments/carNumbox.vue';

    export default {
        name: "ShopcarContainer",
        data(){
          return {
              goodscar:[]
          }
        },
        created(){
            this.getAllCarGoods();
        },
        methods: {
            getAllCarGoods(){
                var idArr=[];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                this.$http.get('api/goods/getshopcarlist/'+idArr.join()).then(results => {
                    if(results.body.status ===0 ){
                        this.goodscar = results.body.message;
                    }else{
                        Toast('获取购物车数据失败！');
                    }
                })
            },
            delGoods(id,index){
                //根据id删除goodscar
                this.goodscar.splice(index,1);
                this.$store.commit('delGoodsitem',id);
            },
            selectedStatus(id,status){
                var goodsStatus={
                    id: id,
                    selected: status
                };
                this.$store.commit('setSelectedStatus',goodsStatus);
            }
        },
        components: {
            'numbox': numbox
        }
    }
</script>

<style scoped lang="less">
    .goodsList {
        background-color: #eee;
        overflow: hidden;
        .goodsCar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            img {
                width: 60px;
                height: 60px;
            }
            .goodsInfo {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title {
                    font-size: 13px;
                }
                .opts {
                    .price {
                        font-size: 12px;
                        color: red;
                    }
                    .delbtn {
                        font-size: 12px;
                    }
                }

            }
        }
        .goods-counts {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .count-info {
                p {
                    font-size: 12px;
                }
                span {
                    color: red;
                    font-weight: 700;
                }
            }

        }
    }
</style>