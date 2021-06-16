<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text67')" >
      <v-row no-gutters justify="start" class="slot-wrap my-3">
        <v-col cols="4" offset="" class="d-flex align-center justify-center">
          <span class="data-title">{{ $t("text62") }}</span
          ><span class="data-number">{{ voteCount.votes | formatNumber }}</span>
        </v-col>
        <v-col cols="4" offset="" class="d-flex align-center justify-center">
          <span class="data-title">{{ $t("text63") }}</span
          ><span class="data-number">{{ voteCount.peoples | formatNumber }}</span>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center align-center">
          <span class="data-title">{{ $t("text64") }}</span>
          <span class="progress-wrap">
            <v-progress-circular
              :value="voteCount.vote_ratio"
              color="#E6B433"
              :size="80"
              :width="12"
              >{{ voteCount.vote_ratio }}</v-progress-circular
            >
            <div class="progress-info-wrap">
              <span class="progress-value">{{ voteCount.vote_ratio }}</span>
              <span class="progress-per">%</span>
            </div>
          </span>
        </v-col>
      </v-row>
    </TopSearch>
    <div class="table-wrap mt30">
      <vVoteTable
          :currentPage="currentPage"
          :limit="limit"
          :pageTotal.sync="pageTotal"
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
import { GetVoteCount } from "@/api/request"

export default {
  name: "vote",
  data: () => ({
      voteCount: {},
      limit: 15, // 请求11条数据
      currentPage: 1,
      pageTotal: undefined,
      timer: undefined
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      GetVoteCount().then(res=> {
        this.voteCount = res.data
      }).finally(()=> {
        this.timer = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    onSearch() {
      // TopSearch 触发的
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
  beforeDestroy(){
    clearTimeout(this.timer)
  }
};
</script>

<style scoped lang="less">
.slot-wrap {
  color: #ffffff;
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
.table-wrap {
  width: 1200px;
  background: #ffffff;
  box-shadow: 2px 2px 8px 0px rgba(45, 69, 133, 0.17);
  border-radius: 10px;
}
</style>
