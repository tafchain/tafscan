<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text76')" @search="onSearch" />
    <div class="table-wrap mt30">
      <vAccountTable
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
  name: "contract",
  data: () => ({
    limit: 15,
    currentPage: 1,
    pageTotal: undefined,
    filterValue: undefined
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.getData();
    },
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
.slot-wrap {
  color: #ffffff;
  margin: 54px 0 27px 0;
  .data-title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    margin-right: 10px;
  }
  .data-number {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
  }
}
</style>
