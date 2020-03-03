<template>
    <div v-if="filminfo" class="detail">
        <!--  -->
        <!-- <div class="detailtitle" v-title="40">
            <i class="iconfont icon-back" @click="handleBack()"></i>
            <span>{{filminfo.name}}</span>
        </div> -->
        <m-title v-title="40"  @back="handleBack()">
            {{filminfo.name}}
        </m-title>
        <img :src="filminfo.poster">
        <h4>{{filminfo.name}}{{filminfo.filmType.name}}</h4>
        <p>{{filminfo.premiereAt | dateFilter}}上映</p>
        <div :class="isActive?'synopsis':''">
            {{filminfo.synopsis}}
        </div>
        <button @click="isActive=!isActive">button</button>
        <h4>演职人员</h4>
        <!-- 不同swiper组件不同class -->
        <swiper :swipernum="{
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true  
        }" swiperclass="actor">
            <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
                <img :src="data.avatarAddress">
            </div>
        </swiper>
        <h4 @click="isPhotoShow=true">剧照</h4>
        <swiper :swipernum="{
            slidesPerView: 2,
            spaceBetween: 10,
            freeMode: true  
        }" swiperclass="photo">
           <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index"  @click="handlePreview(index)">
                <img :src="data">
            </div>
        </swiper>

        <!-- 通过组件覆盖实现路由不跳转刷新页面 -->
        <photo v-show="isPhotoShow" :list="filminfo.photos"  @event="handlePreview($event)">
            <!-- 插槽不需要通信 -->
            <m-title @back="handlePhotoShow">
                剧照 ( {{filminfo.photos.length}} )
            </m-title>
        </photo>
    </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import photo from './Detail/Photo'
import Vue from 'vue';
import { ImagePreview } from 'vant';
import { Dialog } from 'vant';
Vue.use(ImagePreview).use(Dialog);
//1.组件内部定义   //2.全局定义main.js
// import Vue from 'vue'
// Vue.directive("title",{
//     inserted(el,bind){
//         el.style.display = "none"
//         window.onscroll = ()=>{
//             if((document.documentElement.scrollTop || document.body.scrollTop) > bind.value){
//                 el.style.display = "block"
//             }else{
//                 el.style.display = "none"
//             }
//         }
//     },
//     unbind(){
//         window.onscroll = null      //解绑事件监听,否则其他页面也会触发事件
//     }
// })
//1.组件内部定义   //2.全局定义main.js
// import moment from 'moment'    //npm i --save moment下载并引入
// import Vue from 'vue'
// Vue.filter("dateFilter",(data)=>{
//     return moment(data*1000).format('YYYY-MM-DD')
// })
export default {
    data(){
        return{
            filminfo:null,     //先渲染DOM再拿到数据，v-if控制，空数组、空对象为true 
            isActive:true,
            isPhotoShow:false
        }
    },
    components:{
        swiper,
        photo
    },
    methods:{
        handleBack(){
            //this.$router.push('/detail')
            this.$router.back()  //返回上一页
        },
        handlePhotoShow(){
            this.isPhotoShow = false;
        },
        handlePreview(index){
            ImagePreview({
                images:this.filminfo.photos, 
                startPosition: index,
                closeable: true,
                closeIconPosition:"top-left",
            });
        }
    },
    beforeMount(){
        Dialog.confirm({
        title: '该电影目前没有排期，到首页看',
        message: '其他电影吧',
        confirmButtonText:"同意",
        cancelButtonText:"拒绝"
        }).then(() => {
        // on confirm
            this.$router.back()
        }).catch(() => {
        // on cancel
        });
    },
    mounted() {

        // this.$router //路由对象
        // this.$route  //唯一路由对象
        // console.log(this.$route.params.qwe)
        // https://m.maizuo.com/gateway?filmId=4645&k=6706681
        http.request({
            url:`/gateway?filmId=${this.$route.params.qwe}&k=6706681`,
            headers:{
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            console.log(res.data)
            this.filminfo = res.data.data.film
        })
    },
}
</script>
<style scoped lang="scss">
    .detail{
        margin-bottom: 50px;
        // .detailtitle{
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 40px;
        //     background: #fff;
        //     text-align: center;
        //     line-height: 40px;
        //     i{
        //         position: absolute;
        //         left: 0;
        //         top: 0;
        //     }
        // }
        img{
            width:100%;
        }
        .synopsis{
            height:40px;
            overflow:hidden;
        }
    }
</style>