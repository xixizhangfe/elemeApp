// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

/* eslint-disable no-new */
// 调用VueRouter
Vue.use(VueRouter);
// 调用VueResource
Vue.use(VueResource);

// 定义路由组件
// 通过import引入

// 定义路由
const routes = [
  {path: '/', component: App, children: [{path: '/goods', component: goods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}]}
];

// 创建router实例
const router = new VueRouter({
  'linkActiveClass': 'active',
  routes: routes
});

// 创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app');

// 一进入主页默认显示的是商品
// 注意：这里不能用router.go，因为router.go已经被当做前进后退功能，而router.push是导航到特定页面
// router.push('/goods');

// 导出app，否则报错
export default app;

