<template>
  <div>
    <ul>
      <li v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster"/>
        <h3>{{data.name}}</h3>
        <p>观众评分:{{data.grade}}</p>
        <p class="actor">主演：{{data.actors | actorFilter}}</p>
        <p>{{data.nation}} | {{data.runtime}}分钟</p>
      </li>
    </ul>
  </div>
</template>
<script>
import http from '@/util/http'
//1.组件内部定义   //2.全局定义main.js
// import Vue from 'vue'
// Vue.filter("myfilter",(data)=>{
//   // var items = []
//   // data.forEach((value)=>{
//   //   items.push(value.name)
//   // })
//   // var str = items.join()
//   // return str
//   return data.map(item=>item.name).join(" ")
// })
export default {
  data(){
    return {
      datalist:[]
    }
  },
  methods:{
    handleClick(data){
      this.$router.push(`/detail/${data}`)      //编程式跳转页面
    }
  },
  mounted() {
    http.request({
      url:"/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8317728",
      headers:{
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res=>{
      // console.log(res.data)
      this.datalist = res.data.data.films
    })
  }
}
</script>
<style lang="scss" scoped>
li{
  overflow: hidden;
  padding: 5px;
  img{
    float: left;
    width: 100px;
  }
  p{
    margin-top: 10px
  }
  .actor{
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow: hidden;
  }
}
</style>
