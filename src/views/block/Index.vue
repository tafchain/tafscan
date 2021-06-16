<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text14')" @search="onSearch" />
    <div class="table-wrap mt30">
      <vBlockTable
          :currentPage="currentPage"
          :limit="limit"
          :pageTotal.sync="pageTotal"
          :filterValue="filterValue"
      />
    </div>
    <div class="text-center">
      <v-pagination
        :value="currentPage"
        :length="pageTotal"
        color="#E6B433"
        total-visible="10"
        @next="onNextPage(currentPage)"
        @previous="onPrePage(currentPage)"
        @input="onClickPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "block",
  data: () => ({
    limit: 15, // 请求11条数据
    currentPage: 1,
    pageTotal: undefined,
    filterValue: undefined,
  }),
  created() {},
  methods: {
    onSearch(val) {
      this.filterValue = {
        val,
        t: + new Date()
      }
    },
    onClickPage(clickedNum) {
      this.currentPage = clickedNum;
    },
    onNextPage(currentPage) {
      console.log("next", currentPage);
    },
    onPrePage(currentPage) {
      console.log("pre", currentPage);
    },
  },
};
</script>

<style scoped lang="less">
</style>
