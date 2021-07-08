<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in arr"
      :key="index"
      class="tabContrl-item"
      :class="{ active: activeItem === index }"
      @click="isActive(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 0,
    };
  },
  props: {
    arr: {
      type: Array,
      default: [],
    },
  },
  methods: {
    isActive(index) {
      this.activeItem = index;
      //传递点击给父级
      this.$emit("tabClick",index)
    },
  },
};
</script>

<style>
.tabControl {
  display: flex;
  text-align: center;
  font-style: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tabContrl-item {
  flex: 1;
}
.tabContrl-item span {
  padding: 4px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>