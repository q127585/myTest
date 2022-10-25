
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
$http.beforeRequest = function (options) {  
    uni.showLoading({
    	title: '数据加载中...',
	})
}
$http.afterRequest = function () {  
    uni.hideLoading()
}
uni.$http = $http
App.mpType = 'app'

Vue.config.productionTip = false
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif