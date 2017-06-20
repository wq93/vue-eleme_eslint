// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueBus from 'vue-bus';
import App from './App';

// 1. 定义（路由）组件。
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

// 引入自定义的css样式(挂载了3个公共样式)
import './common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueBus);

// 2. 定义路由
const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
  linkActiveClass: 'active'
});

// 页面加载自动导航到goods页面
router.push('/goods');

// 4. 创建和挂载根实例。
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

