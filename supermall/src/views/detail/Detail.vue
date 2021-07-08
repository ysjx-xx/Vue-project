<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImg="topImg" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 记录一下问题，在style里面记得加scppe,包括其它组件，这个加了别的没加一样会影响，
      因为是从别的路由跳转过来的会带着原来的样式 -->
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
//顶部导航栏
import DetailNavBar from "./childrenComps/DetailNavBar.vue";
import DetailSwiper from "./childrenComps/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo.vue";
import DetailParamInfo from './childrenComps/DetailParamInfo.vue';
// BScroll
import Scroll from "components/common/scroll/Scroll";
//网络
import { getGoodsData, GoodsDetails, Shop, GoodsParam } from "network/detail";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
    data(){
      return {
      iid: null,
      topImg: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    }    
    },
    

  created() {
    //保存id
    this.iid = this.$route.query.iid;

    getGoodsData(this.iid).then((res) => {
      const data = res.result;
      //获取轮播图片
      this.topImg = data.itemInfo.topImages;
      //获取商品详细信息
      this.goods = new GoodsDetails(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //商品详情
      this.detailInfo = data.detailInfo;
      //参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
    height: 100vh;
  
}
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {

  height: calc(100% - 44px);
}
</style>