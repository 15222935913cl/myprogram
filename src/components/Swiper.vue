<template>
  <div class="swiper-container" :class="swiperclass">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  props:["swipernum","swiperclass"],
  mounted(){
    //多个swiper不同class名，动态添加class
    new Swiper("."+(this.swiperclass?this.swiperclass:'swiper-container'),this.swipernum)
  }
}
</script>
