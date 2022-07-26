<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="value"
      @input="inputFn"
    />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="list.length == 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(item, index) in hotList"
          :key="index"
          @click="clickFn(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <div v-else class="search_wrap">
      <p class="hot_title">最佳匹配</p>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          center
          :title="item.name"
          :label="`${item.name}-${item.ar[0].name}`"
          v-for="item in list"
          :key="item.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" @click="play(item.id)"/>
          </template>
        </van-cell>
        <!-- <SongItem
          v-for="item in list"
          :key="item.id"
          :name="item.name"
          :author="item.ar[0].name"
          :id="item.id"
        ></SongItem> -->
      </van-list>
    </div>
  </div>
</template>
<script>
import { searchHotListApi, cloudSearchListApi } from "@/api";
// import SongItem from "@/components/SongItem.vue";
export default {
  name: "AA",
  data() {
    return {
      hotList: [],
      value: "",
      list: [],
      loading: false,
      finished: false,
      limit: 20,
      page: 1,
      timer: null,
    };
  },
  methods: {
    async getSearchHotList() {
      try {
        const res = await searchHotListApi();
        console.log(res);
        this.hotList = res.data.result.hots;
      } catch (e) {
        console.log(e);
      }
    },
    async getList() {
      try {
        const res = await cloudSearchListApi({
          keywords: this.value,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        });
        return res.data.result || [];
      } catch (e) {
        console.log(e);
      }
    },
    async inputFn() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        if (this.value.trim() == "") {
          return (this.list = []); 
        }
        try {
          const res = await this.getList();
          this.list = (res && res.songs) || [];
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    },
    async clickFn(val) {
      this.value = val;
      this.page = 1;
      this.finished = false;
      const res = await this.getList();
      this.list = (res && res.songs) || [];
    },
    
    async onLoad() {
      // 异步更新数据
      this.page++;
      const res = await this.getList();
      if (!res.songs || res.songCount <= (this.page - 1) * this.limit) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.list = [...this.list, ...(res.songs || [])];
      this.loading = false;
    },
    play(id) {
      this.$router.push({
      path:'/play',
      query :{
        id:id
      }
    })
    }
  },

  async mounted() {
    this.getSearchHotList();
    // const list = await this.getList()
    // console.log("list",list);
  },
  components: {
    // SongItem,
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
