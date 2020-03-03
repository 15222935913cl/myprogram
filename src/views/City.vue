<template>
    <div>
        <van-index-bar :index-list="indexList">
            <div v-for="(data,index) in dataList" :key="index">
                <!-- 绑定右边索引栏 -->
                <van-index-anchor :index="data.index">{{data.index}}</van-index-anchor>
                <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleClick(item)"/>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant';
import http from '@/util/http'
//1.引入city命名空间
import {mapMutations} from 'vuex'
Vue.use(IndexBar);
Vue.use(IndexAnchor);
export default {
    data(){
        return {
            indexList:[],
            dataList:[]
        }
    },
    mounted(){
        http.request({
            url:"/gateway?k=6373009",
            headers:{
                'X-Host': 'mall.film-ticket.city.list'
            }
            }).then(res=>{
            // console.log(res.data.data.cities)
            // 处理数据{
            //     index：A；
            //     list:["a","an","ai"]      
            //     }
            this.dataFilter(res.data.data.cities)
        })
    },
    methods:{
        dataFilter(cities){
            //26字母数组
            var letterArr = []
            for(var i=65;i<91;i++){
                letterArr.push(String.fromCharCode(i))
            }
            // console.log(letterArr)
            //filter 遍历26个字母， 跟cities数据.pinyin.首字母.大写 进行过滤
            var cityArr = []
            for(var j=0;j<letterArr.length;j++){
                //按字母顺序将城市分类并放入临时数组
                var temparr = cities.filter(item=>item.pinyin.substring(0,1).toUpperCase()===letterArr[j])
                //收集datalist数据
                //当数组长度不为零时存放，否则不存放
                temparr.length && cityArr.push({
                index:letterArr[j],
                list:temparr
                })

                // 收集indexList，右边的字母搜索
                //当数组长度不为零时存放，否则不存放
                temparr.length && this.indexList.push(letterArr[j])
            }

            this.dataList = cityArr
        },
        handleClick(item){
            //3.使用setCityName修改状态
            this.setCityName(item.name)
            this.setCityId(item.cityId)

            //由于刷新页面会清空缓存，切换区域时存储在localstoreage
            // localStorage.setItem("cityId",item.cityId)
            // localStorage.setItem("cityName",item.name)
            //vuex持久化工具  npm i --save vuex-persistedstate 需要配置

            //返回上一页
            this.$router.back();
        },
        //2.city命名空间中，取出setCityName
        ...mapMutations("city",["setCityName","setCityId"])
    }
}
</script>
