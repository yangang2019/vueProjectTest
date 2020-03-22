//入口文件
import Vue from 'vue';
import { Header } from 'mint-ui';

import app from './App.vue';
import '../lib/mui/css/mui.min.css';

Vue.component(Header.name, Header);

var vm = new Vue({
    el: '#app',
    render: c => c(app)
})