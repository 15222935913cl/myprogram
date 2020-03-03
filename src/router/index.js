import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film'
// import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Search from '@/views/Search'
import ErrorComponent from '@/views/ErrorComponent'
import Nowplaying from '@/views/film/Nowplaying'  
import Comingsoon from '@/views/film/Comingsoon'
import City from '@/views/City'

Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children:[
      {
        path: '/film/nowplaying',
        component: Nowplaying,
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon,
      },
      {
        path: '/film',
        redirect: '/film/nowplaying'  //二次路由重定向
      }
    ]
  },
  {
    path: '/cinema',
    // component: Cinema
    //路由懒加载（分割代码）
    component: ()=>import(/*webpackChunkName:'cinema'*/'@/views/Cinema')    //随机定义代码文件名  注释自定义文件名
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail/:qwe',     //qwe占位符 动态路由
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/film'   //路由重定向
  },
  {
    path: '*',
    component: ErrorComponent  //匹配不到路由，显示404
  }
]

const router = new VueRouter({
  //路由模式（/#/  ： hash模式）
  mode: 'history',     //history模式，后端需要配置
  routes
})

//路由拦截（全局配置）
// router.beforeEach((to,from,next)=>{
//   if(to.path === '/center'){
//     // console.log("拦截")
//     if(localStorage.getItem("token")){
//       next()
//     }else{
//       next('/login')    //重定向到登陆页面
//     }
//   }else{
//     next()        //允许通过
//   }
// })

export default router
