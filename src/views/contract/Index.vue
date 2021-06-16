<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text5')" @search="onSearch">
<!--       TODO 先隐藏-->
<!--      <v-row no-gutters justify="start" class="slot-wrap">-->
<!--        <v-col cols="4" offset="2" class="d-flex align-center justify-center">-->
<!--          <span class="data-title">{{ $t("text47") }}</span-->
<!--          ><span class="data-number">{{ system | formatNumber }}</span>-->
<!--        </v-col>-->
<!--        <v-col cols="4" class="d-flex align-center justify-center">-->
<!--          <span class="data-title">{{ $t("text48") }}</span-->
<!--          ><span class="data-number">{{ common | formatNumber  }}</span>-->
<!--        </v-col>-->
<!--      </v-row>-->
    </TopSearch>
    <div class="table-wrap mt30">
      <vContractTable
          :currentPage="currentPage"
          :limit="limit"
          :pageTotal.sync="pageTotal"
          :system.sync="system"
          :common.sync="common"
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
import vContractTable from "@/components/vContractTable";
export default {
  name: "contract",
  components: { vContractTable },
  data: () => ({
    limit: 15,
    currentPage: 1,
    pageTotal: undefined,
    filterValue: undefined,
    system: 0, // 系统合约
    common: 0, // 用户合约
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
