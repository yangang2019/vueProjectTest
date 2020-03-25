//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRource from 'vue-resource';

import app from './App.vue';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import router from './router.js';
import moment from 'moment';
import VuePreview from 'vue-preview';
import Vuex from 'vuex'

Vue.use(VueRouter);
Vue.use(VueRource);
Vue.use(VuePreview);
Vue.use(Vuex);

var car = JSON.parse(localStorage.getItem('car') || '[]');
//实例化vuex
var store=new Vuex.Store({
    state: {
        //car中商品对象{id: 商品ID,counts: 商品数量，price: 商品价格, selected: 是否被选中}
        car: car
    },
    mutations: {
        addGoodstoCar(state,goodsinfo){
            //去重，如果是同一种商品，则直至增加数量
             var flag= false;
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.counts += goodsinfo.counts;
                    //找到符合条件的停止执行
                    flag=true;
                    return true;
                }
            });
            if(!flag){
                //若未找到相同商品，则push
                state.car.push(goodsinfo);
            }
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodscount(state,goodsinfo){
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.counts=parseInt(goodsinfo.counts);
                    return true;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        delGoodsitem(state,id){
            //删除商品
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        setSelectedStatus(state,goodsStaus){
            state.car.some(item => {
                if(item.id == goodsStaus.id){
                    item.selected=goodsStaus.selected;
                    return true;
                }
            })
        }
    },
    getters: {
        getAllGoodsCounts(state){
            //获取所有商品数量
            var c=0;
            state.car.forEach(item => {
                c += item.counts;
            });
            return c;
        },
        getSingleGoodscount(state){
            //获取单种类商品数量
            var x=[];
            state.car.forEach(item => {
                x[item.id]=item.counts;
            });
            return x;
        },
        getSelectedStatus(state){
            //获取商品选中状态
            var s=[];
            state.car.forEach(item => {
                s[item.id]=item.selected;
            });
            return s;
        },
        getAllGoodsPrice(state){
            //获取总价
            var p=0;
            state.car.forEach(item => {
                //判断是否为选中状态
                if(item.selected){
                    p += parseInt(item.price)*parseInt(item.counts);
                }
            });
            return p;
        },
        getSelectedGoods(state){
            var sc=0;
            state.car.forEach(item => {
                if(item.selected){
                    sc += parseInt(item.counts)
                }
            });
            return sc;
        }
    }
});

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// };
// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: {top: 0, bottom: 0},
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
// });
// import { Header, Swipe, SwipeItem, Button} from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui';
Vue.use(MintUI);

Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//过滤器
Vue.filter('dateFormat',function (data,param='YYYY-MM-DD  HH:mm:ss') {
    return moment(data).format(param);
});
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
});