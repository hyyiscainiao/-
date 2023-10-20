<script setup>
import { ref } from 'vue'
import image1 from '@/assets/picture1.jpg'
import image2 from '@/assets/picture2.jpg'
import image3 from '@/assets/picture3.jpg'
import image4 from '@/assets/picture4.jpg'
import image5 from '@/assets/picture5.jpg'

const imageList = ref([{ url: image1 }, { url: image2 }, { url: image3 }, { url: image4 }, { url: image5 }])
</script>

<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in imageList" :key="item">
      <img :src="item.url" no-repeat style="object-fit: fill; height: 100%; width: 100%" />
    </el-carousel-item>
    <!-- <el-carousel-item v-for="item in imageList" :key="item">
        <div :style="{backgroundImage:`url('${item.url}')`}"></div>
      </el-carousel-item> -->
    <div class="center">互联网+时代</div>
  </el-carousel>
</template>

<style lang="scss" scoped>
$headerheight: 60%;
.el-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}
::v-deep .el-carousel__container {
  height: 100%;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;

}
</style>
