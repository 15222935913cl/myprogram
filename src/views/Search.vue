<template>
    <v-touch @swiperight="handleSwipeRight">
        <div>
            <!-- <input type="text" v-model="mytext">
            <button @click="handleClick()">取消</button> -->
             <van-search
                v-model="mytext"
                show-action
                placeholder="请输入搜索关键词"
                @cancel="onCancel"
            />

            <!-- 控制搜索框的检索 -->
            <div v-show="mytext">
                <!-- 控制查询内容的显示 -->
                <ul v-if="searchDataList.length">
                    <!-- <li v-for="data in searchDataList" :key="data.cinemaId">
                        <h4>{{data.name}}</h4>
                    </li> -->
                    <cinema-item v-for="(data,index) in searchDataList" :key="index" :data="data">

                    </cinema-item>
                </ul>
                <div v-else>
                    没有匹配到影院
                </div>
            </div>
        </div>

        <!-- 搜索时不显示  -->
        <!-- 2.vuex中getters也可以解决代码逻辑过重，还可以复用 -->
        <!-- <div class="distance" v-show="!mytext">
            <ul>
                <li v-for="(data,index) in $store.getters.topDataList" :key="index">
                    {{data.name}}
                </li>
            </ul>
        </div> -->

        <van-list v-show="!mytext">
            <van-cell v-for="(data,index) in topDataList" :key="index" :title="data.name"/>
        </van-list>
    </v-touch>
</template>
<script>
import cinemaItem from '@/views/Cinema/cinemaItem'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import Vue from 'vue';
import { Search,List ,Cell} from 'vant';
Vue.use(Search).use(List).use(Cell);
// Vue.use(List);
export default {
    data(){
        return {
            mytext:''
        }
    },
     components:{
        cinemaItem
    },
    computed: {
        ...mapState("cinema",["cinemaList"]),
        ...mapGetters("cinema",["topDataList"]),
        //1.计算属性解决代码逻辑过重（vuex中getters也可以解决）
        // topDataList(){
        //     return this.$store.state.cinemaList.slice(0,5)
        // }
        topDataList(){
            return this.cinemaList.slice(0,5)
        },
        searchDataList(){
            return this.cinemaList.filter(item=>item.name.includes(this.mytext) 
                     || item.name.toUpperCase().includes(this.mytext) || item.name.toLowerCase().includes(this.mytext))
        }
    },
    methods:{
        //把tabbar命名空间的hide,show 截出
        ...mapMutations("tabbar",["hide","show"]), 
        ...mapActions("cinema",["getCinemaAction"]),
        onCancel(){
            this.$router.back()
        },
        //右滑手势事件
        handleSwipeRight(){
            this.$router.back()
        }
    },
    mounted() {
        // this.$store.state.isTabbarShow = false
        //同步修改状态 -提交到mutation
        // this.$store.commit("tabbar/hide")
        this.hide()

        //console.log(this.$store.state.cinemaList)
        if(this.cinemaList.length===0){
            // this.$store.dispatch("getCinemaAction")
            this.getCinemaAction()
        }else{
            console.log("使用缓存")
        }

    },
    destroyed() {
        // this.$store.state.isTabbarShow = true

        // this.$store.commit("tabbar/show")
        this.show()
    },
}
</script>