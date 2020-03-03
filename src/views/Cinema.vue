<template>
  <div>
    <div class="title">
        <div @click="handleChangePage('/city')">{{cityName}}</div>
        <div>影院</div>
        <div><i class="iconfont icon-search" @click="handleChangePage('/cinema/search')"></i></div>
    </div>

    <div class="select">
        <!-- 所有区域显示与隐藏，只有显示时添加高亮 -->
        <div @click="isAreaShow=!isAreaShow" :class="isAreaShow?'active':''">{{current}}</div>
        <div>App订票</div>
        <div>最近去过</div>
    </div>

    <div class="area" v-show="isAreaShow">
      <ul>
        <!-- 当前区域高亮显示 -->
        <li v-for="data in arealist" :key="data" @click="handleArea(data)"
        :class="data===current?'active':''">
          {{data}}
        </li>
      </ul>
    </div>

    <div class="content" :style="{height:scrollHeight}">
        <ul>
          <!-- 组件不支持点击事件，需要加.native修饰符 -->
          <cinema-item v-for="data in computedDatalist" :key="data.cinemaId" :data="data" @click.native="handleClick(data.cinemaId)">

          </cinema-item>
        </ul>
    </div>
  </div>
</template>
<script>
import cinemaItem from './Cinema/cinemaItem'
//安装并引入cnpm i --save better-scroll  滚动流畅
import BetterScroll from 'better-scroll'
//1.mapState 是vuex提供的切割函数，
import { mapState,mapMutations } from 'vuex' 
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  data(){
    return {
      // datalist:[],
      isAreaShow:false,
      current:"全城",//选中是哪个区,当前区域默认全城
      scrollHeight:'0px'
    }
  },
  components:{
    cinemaItem
  },
    methods: {
    handleArea(data){
      //改变current值， current值改变， 计算属性自动计算一遍
      this.current = data;
      this.isAreaShow = false;
    },
    handleChangePage(path){
      if(path === '/city'){
        //清空共享状态 vuex cinemaList
        this.setCinemaList([]);
      }
      this.$router.push(path) //跳转路径
    },
    handleClick(id){
        console.log(id)
    },

    ...mapMutations("cinema",["setCinemaList"])
  },
  computed: {
    //2.拿到命名空间中的公共状态
    ...mapState("cinema",["cinemaList"]),
    ...mapState("city",["cityName","cityId"]),
    //所有区的计算属性
    arealist(){
      //对象=>里面的某个属性，映射出所有区域
      var newarr = this.cinemaList.map(item=>item.districtName)
      //利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      //es6 展开赋值添加 全城（unshift）
      var arealist =["全城",...Array.from(new Set(newarr))]
      return arealist
    },
    //根据选择的不同区域，过滤出相应区域的影院
    computedDatalist(){
      //默认全城区域，显示所有影院
      if(this.current ==="全城") return this.cinemaList
      //过滤出当前区域的所有影院
      return this.cinemaList.filter(item=>item.districtName === this.current)
    }
  },
  beforeMount(){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay:true, //是否显示背景遮罩层
      duration:0 //不会消失
    });
  },
  mounted(){
   // disptch 到 vuex中action
   //减少对服务器的请求
   if(this.cinemaList.length === 0){
     this.$store.dispatch("cinema/getCinemaAction",this.cityId).then(res=>{
        //console.log("异步结束，已经存到vuex")
        Toast.clear();
     })
   }else{
      //console.log("cinema","使用缓存")
      Toast.clear();
   }
   //初始化betterscroll,某个节点有固定高度，内容超过固定高度隐藏
   new BetterScroll(".content",{
      //是否显示滚动条
      scrollbar: {
        fade: true,
        interactive: false // 1.8.0 新增
      },
      click:true //支持click事件
   })

   //修改动态高度样式
   this.scrollHeight = document.documentElement.clientHeight-80-50 +'px'

  }

}

</script>
<style lang="scss" scoped>
  
  .title{
    display: flex;
    justify-content:space-around;
    position:fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index:10;
    div{
      flex:1;
      text-align: center;
    }
  
  }

  .select{
    display: flex;
    position:fixed;
    top:40px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index: 10;
    div{
      flex:1;
      text-align: center;
    }
  }
  .content{
    position: relative;
    top:80px;
    height:300px;
    overflow: hidden;
  }

  .area{
    position:fixed;
    top:80px;
    left:0px;
    width: 100%;
    background: white;
    z-index:10;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 25%;
        padding:5px;
        box-sizing: border-box;  //怪异盒模型
        text-align: center;
        // border:1px solid gray;
      }
      .active{
        border:1px solid red !important;
      }
    }
  }

</style>
