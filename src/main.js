/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2019-09-18 10:59:29
 * @LastEditors  : Chen
 * @LastEditTime : 2020-01-14 19:44:27
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import utils from '@assets/utils'
//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");