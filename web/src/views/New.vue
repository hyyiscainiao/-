<script setup>
import axios from 'axios'
import { onMounted, watchEffect,onBeforeUnmount } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import moment from 'moment'
import { StarFilled } from '@element-plus/icons-vue'
moment.locale('zh-cn')
const route = useRoute()
const router=useRouter()
const New = ref({})
const topNews = ref([])
const stop=watchEffect(async () => {
  if(!route.params.id) return 
  await axios.get(`/webapi/news/list/${route.params.id}`).then((res) => {
    New.value = res.data.data[0]
  })
  await axios.get(`/webapi/news/toplist?limit=4`).then((res) => {
    topNews.value = res.data.data
  })
})
const formatTime = (time) => {
  return moment(time).format('YYYY/MM/DD LT')
}
const handleChange=(id)=>{
  // console.log(id)
  router.push(`/news/${id}`)
}

onBeforeUnmount(()=>stop()
)
</script>
<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ New.title }}</h2>
        <div class="time">{{ formatTime(New.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="New.content"></div></div
    ></el-col>
    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font-size: 16px; font-weight: bolder">最近热门</span>
          </div>
        </template>
        <div
          v-for="(item, index) in topNews"
          :key="item.id"
          style="margin-top: 10px"
          @click="handleChange(item.id)"
        >
          <span class="title">{{ item.title }}</span>
          <div class="bottom">
            <time class="time">{{ formatTime(item.editTime) }}</time>
            <el-divider v-show="index !== 3" />
          </div>
        </div> </el-card
    ></el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
  .time {
    font-size: 13px;
    color: gray;
  }
}
</style>
