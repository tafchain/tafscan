<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text35')" @search="onSearch" />
    <div class="table-wrap mt30">
      <vTradeTable
        :currentPage="currentPage"
        :limit="limit"
        :tradePageHeaders="tradePageHeaders"
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
import vTradeTable from "@/components/vTradeTable";
export default {
  name: "transaction",
  components: { vTradeTable },
  data: () => ({
    limit: 15, // 请求11条数据
    currentPage: 1,
    pageTotal: undefined,
    filterValue: undefined
  }),
  computed: {
    tradePageHeaders() {
      return [
        // 替换默认的标题
        {
          text: this.$t("text35"),
          align: "center",
          value: "id",
        },
        {
          text: this.$t("text36"),
          align: "center",
          value: "direction",
        },
        {
          text: this.$t("text40"),
          align: "center",
          value: "block_num",
        },
        {
          text: this.$t("text54"),
          align: "center",
          value: "timestamp",
        },
        {
          text: this.$t("text55"),
          align: "center",
          value: "amount",
        },
      ];
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
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
</style>
