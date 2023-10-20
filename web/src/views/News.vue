<script setup>
import bgImage from '@/assets/bg.jpg'
import { ref, onMounted, reactive, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import {useRouter} from 'vue-router'
moment.locale('zh-cn')
const search = ref('')
const visible = ref(false)
const list = ref([])
const getlist = async () => {
  await axios.get('/webapi/news/list').then((res) => {
    list.value = res.data.data
    // console.log(list.value)
    console.log(_.groupBy(list.value, (item) => item.category))
  })
  return list
}
onMounted(async () => {
  await getlist()
})

const filterList = computed(() =>
  search.value === ''
    ? []
    : list.value.filter(
        (item) => !search.value || item.title.toLowerCase().includes(search.value.toLowerCase())
      )
)

const formatTime = (time) => {
  return moment(time).format('YYYY/MM/DD LT')
}

const whichTab = ref(1)
const tablist = [
  {
    name: 1,
    label: '最新动态'
  },
  {
    name: 2,
    label: '典型案例'
  },
  {
    name: 3,
    label: '通知公告'
  }
]
const topNewsList = computed(() => list.value.slice(0, 4))
const tabnews = computed(() => _.groupBy(list.value, (item) => item.category))

const router =useRouter()
const handleChange=(id)=>{
  // console.log(id)
  router.push(`/news/${id}`)
}
</script>
<template>
  <div class="container">
    <!-- 搜索 -->
    <div class="news-header" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="search">
      <el-popover placement="bottom" title="搜索结果" width="50%" :visible="visible">
        <template #reference>
          <el-input
            v-model.trim="search"
            type="search"
            placeholder="请输入关键词"
            :prefix-icon="Search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="filterList.length">
          <div v-for="item in filterList" :key="item.id" class="search-item" @click="handleChange(item.id)">{{ item.title }}</div>
        </div>
        <div v-else><el-empty description="无搜索结果" image-size="50px" /></div>
      </el-popover>
    </div>
    <!-- 热门新闻 -->
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChange(item.id)">
            <div
              class="image"
              :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"
            ></div>
            <div style="padding: 14px">
              <span class="title">{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ formatTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card></el-col
        >
      </el-row>
    </div>
<!-- 新闻分类 -->
    <el-tabs v-model="whichTab" class="demo-tabs">
      <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
        <el-row :gutter="20">
          <el-col :span="16">
            <div v-for="data in tabnews[item.name]" :key="data.id" style="{margin: 10px;}">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChange(data.id)">
                <div
                  class="tab-image"
                  :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }"
                ></div>
                <div style="padding: 14px; float: left">
                  <span class="title">{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time">{{ formatTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6" class="timeline">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in tabnews[item.name]"
                :key="index"
                :timestamp="formatTime(item.editTime)"
                @click="handleChange(item.id)"
              >
                {{ item.title }}
              </el-timeline-item>
            </el-timeline></el-col
          >
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" visibility-height="10"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.news-header {
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background-color: whitesmoke;
    color: red;
  }
}
.topnews {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .time {
    font-size: 13px;
    color: gray;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    display: block;
    height: 60px;
    overflow: hidden;
  }
  .el-tabs {
    margin-top: 20px;
  }
}
.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  display: flex;
  float: left;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs {
  margin: 20px;
  .el-card {
    margin: 10px;
  }
}
.timeline {
  margin: 20px;
}
</style>
