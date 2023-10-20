<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Navbar></Navbar></el-header>
      <el-main> <RouterView /></el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  position: relative;
  width: 100%;
  /* height: 60px; */
}
.el-main {
  position: absolute;
  left: 0px;
  right: 0;
  top: 60px;
  bottom: 0;
  margin: 0;
  padding: 0;
  /* overflow-y: scroll; */
}
</style>
