<template>
    <div>
        <button @click="handleClick()">登陆</button>
    </div>
</template>
<script>
export default {
    methods:{
        handleClick(){
            localStorage.setItem("token",JSON.stringify({isLogin:true}))
            this.$router.push('/center')
        }
    }
}
</script>
