//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRource from 'vue-resource';

import app from './App.vue';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import router from './router.js';
import moment from 'moment';
import VuePreview from 'vue-preview'

Vue.use(VueRouter);
Vue.use(VueRource);
Vue.use(VuePreview);

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
    router
});