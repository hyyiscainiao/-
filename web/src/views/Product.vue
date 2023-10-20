<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
const looplist = ref([])
onMounted(async () => {
  await axios.get('/webapi/product/list').then((res) => {
    looplist.value = res.data.data
  })
})
</script>
<template>
  <el-carousel height="100%" direction="vertical" :autoplay="false" v-if="looplist.length">
    <el-carousel-item v-for="item in looplist" :key="item.id">
      <div
        class="image"
        :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"
      ><el-card class="box-card">
        <template #header>
          <div class="card-header">
           <h2 style="font-weight: bolder;font-size: 40px;">{{ item.name}}</h2>
          </div>
        </template>
        <div>{{ item.introduction}}</div>
        <div style="margin-top: 50px;">{{ item.detail}}</div>
      </el-card></div>
      
    </el-carousel-item>
  </el-carousel>
  <el-empty description="暂无产品" v-else />
</template>

<style lang="scss" scoped>
.el-carousel {
  width: 100%;
  height: 100%;
}
::v-deep .el-carousel__container {
  height: 100%;
}
.image {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box-card{
  width: 50%;
  height: 100%;
  background-color: rgba(255,255,255,0.7);
}
</style>
