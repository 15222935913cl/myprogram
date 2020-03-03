<template>
    <div class="detailtitle">
            <i class="iconfont icon-back" @click="handleClick()"></i>
            <span>
                <slot></slot>
            </span>
        </div>
</template>
<script>
export default {
    methods: {
        handleClick(){
            // this.$router.back()
            this.$emit("back")
        }
    },
}
</script>
<style scoped lang="scss">
.detailtitle{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #fff;
    text-align: center;
    line-height: 40px;
    i{
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>