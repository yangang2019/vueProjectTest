<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active':'']" v-for="item in photobar" :key="item.id" @click="getPhotoInfolists(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片列表区域 -->
        <ul class="infoList">
            <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/PhotoInfoDetail/'+item.id">
                <img v-lazy="item.img_url">
                <div class="imgInfo">
                    <h1 class="title">{{ item.title }}</h1>
                    <div class="zhiyao">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    import mui from '../../lib/mui/js/mui.min.js';

    export default {
        name: "PhotoLists",
        data(){
            return {
                photobar:[],
                list: []
            }
        },
        created(){
          this.getPhotolistbar();
          this.getPhotoInfolists(0);
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getPhotolistbar(){
                this.$http.get('api/getimgcategory').then(result => {
                    if(result.body.status === 0){
                        result.body.message.unshift({ title: '全部',id: 0});
                        this.photobar=result.body.message;
                    }else{
                        Toast('导航列表失败！');
                    }
                })
            },
            getPhotoInfolists(cateid){
                this.$http.get('api/getimages/'+cateid).then(result => {
                    if(result.body.status === 0){
                        this.list=result.body.message;
                    }else{
                        Toast('图片列表失败！');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    * {
        touch-action: pan-y;
    }
.infoList{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .imgInfo {
            color: white;
            text-align: left;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            position: absolute;
            bottom: 0;
            left: 0;
            .title {
                font-size: 14px;
            }
            .zhiyao {
                font-size: 13px;
            }
        }
    }
}
</style>