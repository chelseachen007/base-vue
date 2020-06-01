import '@style/common.scss'
import '@style/reset.scss'
import echarts from "echarts"
import axios from '@utils/http/request'
// import moment from 'moment'
// monent.locale('zh-cn'); //中文
export default {
    install(Vue) {
        Vue.prototype.echarts = echarts;
        Vue.prototype.$axios = axios
    }
}