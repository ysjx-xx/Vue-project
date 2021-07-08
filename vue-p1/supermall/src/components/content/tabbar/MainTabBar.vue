<template>
<div><tab-bar>
    <tab-bar-item path='/home' textColor='red'>
        <img slot="item-image" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-active-image" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path='/category'>
        <img slot="item-image" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-active-image" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path='/shopcart'>
        <img slot="item-image" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-active-image" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path='/profile'>
        <img slot="item-image" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-active-image" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
import TabBar from 'components/common/tabbar/TabBar.vue'
export default {
  components: { TabBarItem,
  TabBar },

}
</script>

<style>

</style>