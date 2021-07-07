<template>
  <div id="home">
    <nav-bar class="navbar-center">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        @tabClick="tabClick"
        :arr="['新款', '流行', '精选']"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"/>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control
        @tabClick="tabClick"
        :arr="['新款', '流行', '精选']"
        ref="tabControl"
      />
      <good-list :goods="goods[type].list"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow" />
  </div>
</template>

<script>
// 顶部
import NavBar from "components/common/navbar/NavBar.vue";
//轮播图
import HomeSwiper from "./childrenComps/HomeSwiper.vue";
//轮播图下4个小item
import HomeRecommendView from "./childrenComps/HomeRecommendView.vue";
//本周流行(一张图片)
import HomeFeatureView from "./childrenComps/HomeFeatureView.vue";
//选项卡(选择"流行","新款","精选")
import TabControl from "components/content/tabControl/TabControl.vue";
//商品展示
import GoodList from "components/content/goods/GoodList.vue";
//回顶部按钮
import BackTop from "components/content/backTop/BackTop.vue";

//网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
//滚动:better scroll
import Scroll from "components/common/scroll/Scroll.vue";
//工具(防抖函数)
import { debounce } from "common/tool";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      type: "pop",
      isBackTopShow: false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    };
  },
  created() {
    // 请求轮播图数据
    this.getHomeMultidata();
    // 请求商品数据，分3栏
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("imgLoad", () => {
      //判断$refs.scroll是否为空
      refresh();
    });
    
  },
  // 设置位置为上次离开时的位置
  activated() {
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.scroll.refresh()
  },
  //保存离开时的位置
  deactivated() {
    this.saveY=this.$refs.scroll.scroll.y
  },
  methods: {
    //监听tabControl点击
    tabClick(index) {
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
          break;
      }
      this.$refs.tabControl1.activeItem=index;
      this.$refs.tabControl.activeItem=index;
    },
    //监听返回顶部组件的点击
    backTopClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 600);
    },
    //监听页面移动，控制回顶部模块的显示和隐藏
    contentScroll(position) {
      this.isBackTopShow = -position.y > 1000
      // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    
    pullingUp() {
      this.getHomeGoods(this.type)
    },
    swiperImageLoad(){
// $el获取组件中的元素
    this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
    },

    //网络
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods.pop.page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(this.goods[type].page);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data.list);
        //  console.log(this.goods[type].page);
        //  console.log(this.goods[type].list);
        //完成上拉加载更多之后，执行finashPullUp
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.navbar-center {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
</style>