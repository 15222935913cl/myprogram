<template>
    <li>
        <h4>{{data.name}}</h4>
        <p>{{data.address}}</p>
    </li>
</template>
<script>
export default {
    props:["data"]
}
</script>
<style scoped lang="scss">
 li{
    padding:10px;
 }
</style>