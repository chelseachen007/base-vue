import "@style/common.scss";
import "@style/reset.scss";
import echarts from "echarts";
import axios from "@utils/axios";
import elementUI from "element-ui";
import * as directives from "../directives"; // global directives

// import moment from 'moment'
// monent.locale('zh-cn'); //中文
export default {
  install(Vue) {
    Vue.prototype.echarts = echarts;
    Vue.prototype.$axios = axios;
    Vue.use(elementUI, { size: "small", zIndex: 3000 });
    Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));
  }
};
