<template>
    <div>
        Center
    </div>
</template>
<script>
export default {
    //路由拦截局部定义
    //路由钩子函数 
    beforeRouteEnter (to, from, next) {
        // ...
        console.log("拦截")
        if(localStorage.getItem("token")){
            next()
        }else{
            next('/login')    //重定向到登陆页面
        }
    },

    beforeRouteUpdate(to, from, next) {
        console.log("beforeRouteUpdate调用",'/detail/1111-->/detail/222')  //路由更新
    },

    beforeRouteLeave (to, from, next) {
        // ...
        console.log("beforeRouteLeave调用")
        next()      //next()调用放行，否则不允许离开
    }

}
</script>