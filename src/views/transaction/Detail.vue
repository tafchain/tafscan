<template>
  <div class="page-wrap">
<!--    <TopSearch :placeholder="$t('text14')" @search="onSearch" />-->
    <div class="detail-info-wrap mt30">
      <!--交易信息-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div class="mr-2">{{ $t("text56") }}</div>
        </div>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text57") }}</span
        ><span>{{ formatBool(data.status) }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text60") }}</span
        ><span>{{ data.hash }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="data.hash"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText = true"
                @mouseleave="showCopyText = false"
                v-clipboard:copy="data.hash"
            />
          </template>
          <span v-show="!showCopyText">点击复制</span>
          <span v-show="showCopyText">已复制</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text40") }}：</span
        ><span>{{ data.block_num }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text33") }}</span
        ><span> {{ data.timestamp | formatTime }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <v-sheet
          color="#F8FAFC"
          min-height="169"
          width="1120"
          class="rounded-lg table-wrap"
        >
          <v-row no-gutters class="text-center">
            <v-col cols="2">{{ $t("text36") }}</v-col>
            <v-col cols="2">{{ $t("text37") }}</v-col>
            <v-col cols="2">{{ $t("text38") }}</v-col>
            <v-col cols="2">{{ $t("text39") }}</v-col>
            <v-col cols="4">{{ $t("text61") }}</v-col>
          </v-row>
          <v-row no-gutters class="text-center"
                 v-for="(row, index) in data.actions"
                 :key="index"
          >
            <v-col cols="2">
              <div v-if="!row.direction.includes('->')">{{ row.direction }}</div>
              <div v-else>
                <span class="default-yellow"
                      @click="toAccount(row.direction.split('->')[0])">
                  {{ row.direction.split('->')[0] }}
                </span>
                ->
                <span class="default-yellow"
                      @click="toAccount(row.direction.split('->')[1])">
                  {{ row.direction.split('->')[1] }}
                </span>
              </div>
            </v-col>
            <v-col cols="2">{{ row.amount || 0 }}</v-col>
            <v-col cols="2">{{ row.contract_name }}</v-col>
            <v-col cols="2">{{ row.action_name }}</v-col>
            <v-col class="text-left" cols="4"><code>{{ JSON.parse(row.origin_data) }}</code></v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </div>
  </div>
</template>

<script>
import {GetSingleTrade} from '@/api/request'
export default {
  name: "transactionDetail",

  data: () => ({
    data: {},
    showCopyText: false
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
      this.getData();
    },
    update() {},
    getData() {
      let params = {
        trans_id: this.$store.state.trade_id
      }
      GetSingleTrade(params).then(res=> {
        this.data = res.data
        console.log( res.data )
      })
    },
    onSearch() {
      // TopSearch 触发的
    },

    formatBool(status) {
      return status == 0? this.$t('text58') : this.$t('text59')
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
  },
  computed: {
  }
};
</script>

<style scoped lang="less">
@import "../../css/detailPages";
</style>
