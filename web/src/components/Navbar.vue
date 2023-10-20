<script setup>
import {useRoute} from 'vue-router'
const route= useRoute()
const login =()=>{
    window.location='http://localhost:8080/login'
}
</script>
<template>
  <div class="navbar"><el-menu
    :default-active="route.fullPath"
    class="el-menu-demo"
    mode="horizontal"
    router="true"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/news">新闻中心</el-menu-item>
    <el-menu-item index="/product">产品与服务</el-menu-item>
    <el-menu-item @click="login">登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div></div>
</template>
<style lang="scss" scoped>
.navbar{
    display: flex;
    justify-content: space-between;
    height: 60px;
}
.el-menu{
    width: 35%;
}
.right{
   
   line-height: 60px;

}
</style>
