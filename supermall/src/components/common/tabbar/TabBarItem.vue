<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name='item-image' ></slot></div>
      <div v-else><slot name="item-active-image" ></slot></div>
      <div :style="{color:isActiveColor}"><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
    props:{
        path:{
            type:String
        },
        textColor:{
            type:String,
            default:'red'
        }
    },
    computed:{
        isActive(){
            return this.$route.path===this.path
        },
        isActiveColor(){
            return this.isActive? this.textColor:''
        }
    },
    methods: {
        itemClick(){
this.$router.replace(this.path).catch(err=>{err})
        },
    },

}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 2px;
}
</style>