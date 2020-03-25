import VueRouter from 'vue-router';
import HomeContainer from './components/tabbars/HomeContainer.vue';
import MemberContainer from './components/tabbars/MemberContainer.vue';
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue';
import SearchContainer from './components/tabbars/SearchContainer.vue';
import NewsContainer from './components/news/NewsListContainer.vue';
import NewsInfoContainer from './components/news/NewsInfo.vue';
import PhotoLists from './components/photos/PhotoLists.vue';
import PhotoInfoDetails from './components/photos/PhotoInfoDetail.vue';
import Goodslist from './components/goods/GoodsLists.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComments from './components/goods/GoodsComments.vue';



var router=new VueRouter({
    routes:[
        { path:'/',redirect: '/home' },
        { path:'/home',component: HomeContainer },
        { path:'/member',component: MemberContainer },
        { path:'/shopcar',component: ShopcarContainer },
        { path:'/search',component: SearchContainer },
        { path:'/home/newslist',component: NewsContainer },
        { path:'/home/newsinfo/:id',component: NewsInfoContainer },
        { path:'/home/photolist',component: PhotoLists },
        { path:'/home/PhotoInfoDetail/:id',component: PhotoInfoDetails },
        { path:'/home/goodslist',component: Goodslist },
        { path:'/home/goodsinfo/:id', component: GoodsInfo,name: 'goodsinfo'},
        { path:'/home/goodsdesc/:id', component: GoodsDesc,name: 'goodsdesc'},
        { path:'/home/goodscomments/:id', component: GoodsComments,name: 'goodsComments'}
    ],
    linkActiveClass: 'mui-active'
});
export default router