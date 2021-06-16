<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  mounted() {
    // console.log(process.env.BASE_URL)
  }
 };
</script>
<style lang="less">
  @import "./css/base.less";
  @import "./css/reset.less";
</style>
