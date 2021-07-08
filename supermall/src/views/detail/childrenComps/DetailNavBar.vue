<template>
  <nav-bar>
      <div slot="left" class="back" @click="goBack">
          <img src="~assets/img/common/back.svg" alt="">
          </div>
<div slot="center" class="title">
    <div v-for="(item,index) in titles"
     :key="index"
      class="item"
      :class="{activeIndex:activeIndex===index}"
      @click="activeIndex=index">{{item}}</div>
</div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
  data() {
      return {
          titles:["商品","参数","评论","推荐"],
          activeIndex:0
      }
  },
  methods: {
      goBack(){
          this.$router.go(-1)
      }
  },


}
</script>

<style scoped>
.title{
    display: flex;
    font-size: 14px;
}
.item{
    flex: 1;
}
.activeIndex{
color:var(--color-high-text)
}
.back img{
margin-top: 10px;
}
</style>