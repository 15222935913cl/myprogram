<template>
    <nav>
        <ul>
            <!-- router-link 声明式导航，路径跳转，类似a链接跳转 -->
            <!-- activeClass 高亮显示效果 自动添加class-->
            <router-link v-for="data in navlist" :key="data.name" 
            :to="data.router" tag="li" activeClass="active">
                <i class="iconfont" :class="data.icon"></i>
                <span>{{data.name}}</span>
            </router-link>
        </ul>
    </nav>
</template>
<script>
export default {
    data () {
        return {
            navlist:[{router:"/film",
                        name:"电影",
                        icon:"icon-all"
                    },
                    {router:"/cinema",
                         name:"影院",
                         icon:"icon-category"
                    },
                    {router:"/center",
                         name:"我的",
                         icon:"icon-account"
                    }],
        }
    }
}
</script>
<style scoped lang="scss">
  .active{
    color:red;
  }

  nav{
    position: fixed;
    left:0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: white;
    z-index: 10;
    ul{
      display: flex;
      li{
        flex:1;
        line-height:25px;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>