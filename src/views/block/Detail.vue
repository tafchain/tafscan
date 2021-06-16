<template>
  <div class="page-wrap">
<!--    <TopSearch :placeholder="$t('text14')" @search="onSearch" />-->
    <div class="detail-info-wrap mt30">
      <!--区块号-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div class="mr-2">{{ $t("text40") }}</div>
          <div>{{ blockNum }}</div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                  v-show="blockNum"
                  class="copy"
                  max-width="20"
                  src="@/assets/copy.png"
                  contain
                  v-bind="attrs"
                  v-on="on"
                  @click="showCopyText1 = true"
                  @mouseleave="showCopyText1 = false"
                  v-clipboard:copy="blockNum"
              />
            </template>
            <span v-show="!showCopyText1">点击复制</span>
            <span v-show="showCopyText1">已复制</span>
          </v-tooltip>
        </div>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text41") }}</span
        ><span class="default-yellow" @click="toAccount(data.packer)">{{ data.packer }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text42") }}</span
        ><span>{{ data.pack_time | showElapsedTime }} ({{ data.pack_time | formatTime }})</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text43") }}</span
        ><span>{{ data.verier }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text44") }}</span
        ><span>{{ data.verify_time | showElapsedTime }} ({{ data.verify_time | formatTime }})</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text45") }}</span
        ><span>{{ data.hex_data }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="data.hex_data"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText2 = true"
                @mouseleave="showCopyText2 = false"
                v-clipboard:copy="data.hex_data"
            />
          </template>
          <span v-show="!showCopyText2">点击复制</span>
          <span v-show="showCopyText2">已复制</span>
        </v-tooltip>
      </v-row>
      <!--原始数据-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div>{{ $t("text46") }}</div>
        </div>
      </v-row>
      <v-row no-gutters class="pl-1">
        <v-sheet
            color="#F8FAFC"
            min-height="169"
            width="1120"
            class="rounded-lg table-wrap"
        >
          {{ data.origin_data }}
        </v-sheet>
      </v-row>
    </div>
  </div>
</template>

<script>
import { GetSingleBlock } from '@/api/request.js'
export default {
  name: "blockDetail",
  data: () => ({
    blockNum: undefined,
    data: {},
    showCopyText1: false,
    showCopyText2: false
  }),
  created() {},
  mounted() {
    this.init();
  },
  activated() {
    // this.update();
  },
  methods: {
    init() {
      if (this.$route.params.block_num) {
        this.data = this.$route.params.block_info
        this.blockNum = this.$route.params.block_num
        return
      }
      this.getData();
    },
    update() {},
    getData() {
      this.blockNum = Number(this.$store.state.block_num)
      let params = {
        block_num: this.blockNum
      }
      GetSingleBlock(params).then(res=> {
        this.data = res.data
      })
    },
    onSearch(value) {
      this.$store.commit('SAVE_BLOCK_NUM', value)
      // TopSearch 触发的
      this.getData()
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
  },
  filters: {
    showElapsedTime( value ) {
      if (!value) return ''
      let date1= value;  //开始时间
      let date2 = new Date();    //结束时间
      let date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数

      //------------------------------

      //计算出相差天数
      let days=Math.floor(date3/(24*3600*1000))

      //计算出小时数

      let leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
      let hours=Math.floor(leave1/(3600*1000))
      //计算相差分钟数
      let leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
      let minutes=Math.floor(leave2/(60*1000))
      //计算相差秒数
      let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
      let seconds=Math.round(leave3/1000)
      // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
      let res = ''
      if (days) res += days + "天"
      if (hours)  res += hours + "小时"
      if (minutes)  res += minutes + "分钟"
      if (seconds)  res += seconds + "秒前"
      return res
    },
  }
};
</script>

<style scoped lang="less">
@import "../../css/detailPages";
</style>
