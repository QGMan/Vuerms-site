// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';


// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

// 1.0 路由的写法
// 1.0.0 导包
import vueRouter from 'vue-router';

// 1.0.2 将vueRouter和vue绑定起来
Vue.use(vueRouter);

// 1.0.3 定义路由规则
// 导入系统的整体布局组件
import layout from './components/site/layout.vue';
// 导入商品列表组件
import goodslist from './components/site/goodslist.vue';

// 导入商品详情组件
import goodsinfo from './components/site/goodsinfo.vue';
import car from './components/site/car.vue';

var router = new vueRouter({
    // 去#
    // mode: "history",
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist }, //商品列表的路由规则
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: 'car', path: 'car', component: car }
            ]
        }
    ]
});

// 2.0 axios的使用
// 2.0.1 导入axios包
import axios from 'axios';
// 2.0.2 设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

// 2.0.3 想要在将来的每个子组件中的方法中均可以使用 this.$http去调用其方法执行ajax请求
//就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;

// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.0.4 绑定到vue上
Vue.use(axios);

// 3.0 使用elementUI这个ui框架的步骤
// 3.0.1、导包
import elementUI from 'element-ui';
// 3.0.2 导入elemeui的css控制样式
// 由于项目的样式和elementui的css样式有些不一样，那么修改了这个样式以后，要利用自己的样式替换原来的原有样式

// import 'element-ui/lib/theme-default/index.css';

// 3.0.3 绑定
Vue.use(elementUI);

// 导入整个网站布局的控制样式
import '../statics/site/css/style.css';


// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
    }

});

//使用vuex实现跨组件通讯
import vuex from "vuex";
import { getItem } from "./kits/localStorage.js";
Vue.use(vuex);
// 一：
var state = {
    buyCount: 0
};
// 二：
var actions = {
    changebuyCount({ commit }, userbuyCount) {
        commit("changebuyCount", userbuyCount)
    }
};
var mutations = {
    changebuyCount(state, userbuyCount) {
        state.buyCount += userbuyCount
    }
};
var getters = {
    //页面刷新后将localStorage中的值赋给购物车中
    getCount(state) {
        if (state.buyCount < 0) {
            return state.buyCount;
        }
        var godobj = getItem();
        var count = 0;
        for (var key in godobj) {
            count++;
        }
        state.buyCount = count;
        return state.buyCount;
    }
};
var store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
})


new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    store, //启用vuex组件-注册

    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});