<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <!-- 路由容器  一级路由 -->
    <transition name="app" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import tabbar from '@/components/Tabbar'
import {mapState} from 'vuex'
export default {
   components:{
     tabbar
   },
   mounted() {
     console.log(this.isTabbarShow) //访问公共状态
   },
   computed:{
    //从tabbar命名空间中直接找 isTabbarShow
    ...mapState("tabbar",["isTabbarShow"])
   }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  ul{
    list-style: none;
  }

    .app-enter-active {
    animation: aaa .5s;
  }
  .app-leave-active {
    animation: aaa .5s reverse;
  }
  @keyframes aaa {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
</style>


