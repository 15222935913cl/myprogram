<template>
    <div>
        <swiper :key="looplist.length">
          <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
            <img :src="data.imgUrl"/>
          </div>
        </swiper>
        <!-- 路由容器  二级路由-->
        <router-view></router-view>
    </div>
</template>
<script>
//封装请求头模块
import http from '@/util/http'
import swiper from '@/components/Swiper'
import {mapState} from 'vuex'
export default {
    data(){
      return {
        looplist:[]
      }
    },
     components:{
      swiper //局部注册swiper组件
    },
    computed:{
      ...mapState("city",["cityId"])
    },
    mounted() {
      http.request({
        url:`/gateway?type=2&cityId=${this.cityId}&k=3529285`,
        headers:{
          'X-Host': 'mall.cfg.common-banner'
        }
      }).then(res=>{
        // console.log(res.data)
        // var obj = {
        //   bannerId:22222222222,
        //   imgUrl:"https://static.maizuo.com/pc/v5/usr/movie/f046c5d6b2c397a8194ab14dc439d7dd.jpg"
        // }
        // //es6 分解数组
        // this.looplist = [...res.data.data,obj]
        // console.log(this.looplist)
        console.log(res.data.data)
        if(res.data.data){
          this.looplist = res.data.data
        }
      })
    }
}
</script>
<style scoped lang="scss">
  .swiper-slide{
    img{
      width: 100%;
    }
  }
  // ul{
  //   position: fixed;
  //   left:0px;
  //   top: 0px;
  //   width: 100%;
  //   height: 50px;
  //   background: white;
  //   border-bottom:1px solid #666;
  //   display: flex;
  //     li{
  //       flex:1;
  //       line-height:50px;
  //       text-align: center;
  //       .active{
  //               color:red;
  //           }
  //     }
  //   }
</style>
