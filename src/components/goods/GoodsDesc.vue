<template>
    <div class="goodsdesc-container">
        <h1 class="title">{{ goodsDetail.title }}</h1>
        <hr>
        <div class="goodscontent" v-html="goodsDetail.content"></div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "GoodsDesc",
        data(){
          return {
              id: this.$route.params.id,
              goodsDetail:{}
          }
        },
        created(){
          this.getGoodsDetail();
        },
        methods:{
            getGoodsDetail(){
                this.$http.get('api/goods/getdesc/'+this.id).then(results => {
                    if(results.body.status === 0){
                        this.goodsDetail = results.body.message[0];
                    }else {
                        Toast('获取图文介绍失败！');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .goodsdesc-container {
        padding:4px;
        .title {
            font-size: 16px;
            color: blue;
            text-align: center;
        }
        .goodscontent {
            /deep/  img{
                width: 100%;
            }
        }
    }
</style>