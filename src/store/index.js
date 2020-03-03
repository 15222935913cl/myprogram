import Vue from 'vue'
import Vuex from 'vuex'
//引入命名空间
import tabbar from './module/tabbarShowModule'
import cinema from './module/cinemaModule'
import city from './module/cityModule'
//引入vuex持久化工具
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer(data){
      return {
        city:data.city    //默认所有状态，自定义存储内容city命名空间
      }
    }
  })],
  state: {
    //公共状态管理
   
  },
  mutations: {
    //唯一修改状态的地方
      //1.同步处理，在mutations通过事件触发可直接修改
     
                               
  },
  actions: {
    //2.异步处理，先请求数据
   
  },
  getters:{
    //类似于vue中的计算属性
   
  },
  modules: {
    //注册命名空间
    tabbar,
    cinema,
    city,
  }
})
