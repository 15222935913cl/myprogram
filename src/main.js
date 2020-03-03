import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/util/filter'    //引入全局过滤器
import '@/util/directive' //引入全局指令
import '@/util/component' //引入全局组件

//安装并引入手势库 cnpm i --save vue-touch@next
import VueTouch from 'vue-touch'
Vue.use(VueTouch,{name:'v-touch'})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
