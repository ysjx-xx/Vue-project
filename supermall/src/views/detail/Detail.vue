<template>
  <div>{{iid}}</div>
</template>

<script>
export default {
    data() {
        return {
            iid:null
        }
    },
    activated() {
        this.iid=this.$route.query.iid
    },

}
</script>

<style>

</style>