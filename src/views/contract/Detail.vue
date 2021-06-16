<template>
  <div class="page-wrap">
<!--    <TopSearch :placeholder="$t('text17')" @search="onSearch" />-->
    <div class="detail-info-wrap mt30">
      <!--账户信息-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div class="mr-2">{{ $t("text28") }}</div>
        </div>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text29") }}</span
        ><span>{{ data.account_name }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="data.account_name"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText1 = true"
                @mouseleave="showCopyText1 = false"
                v-clipboard:copy="data.account_name"
            />
          </template>
          <span v-show="!showCopyText1">点击复制</span>
          <span v-show="showCopyText1">已复制</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text30") }}</span
        ><span>{{ data.public_key }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="data.public_key"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText2 = true"
                @mouseleave="showCopyText2 = false"
                v-clipboard:copy="data.public_key"
            />
          </template>
          <span v-show="!showCopyText2">点击复制</span>
          <span v-show="showCopyText2">已复制</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text31") }}</span
        ><span>{{ data.balance }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text32") }}</span
        ><span>{{ data.creator }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text33") }}</span
        ><span>{{ data.create_time | formatTime }}</span>
      </v-row>
      <!--合约交易-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div class="mr-2">{{ $t("text49") }}</div>
        </div>
      </v-row>
      <v-row no-gutters class="pl-1">
        <v-sheet
          color="#F8FAFC"
          height="245"
          width="1120"
          class="rounded-lg table-wrap"
        >
          <v-row no-gutters class="text-center">
            <v-col>{{ $t("text35") }}</v-col>
            <v-col>{{ $t("text36") }}</v-col>
            <v-col>{{ $t("text37") }}</v-col>
            <v-col>{{ $t("text38") }}</v-col>
            <v-col>{{ $t("text39") }}</v-col>
          </v-row>
          <v-row no-gutters
                 class="text-center"
                 v-for="row in data.trade_data"
                 :key="row.id"
          >
            <v-col>{{ row.id }}</v-col>
            <v-col>
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
            <v-col>{{ row.amount || 0 }}</v-col>
            <v-col>{{ row.contract_name }}</v-col>
            <v-col>{{ row.action_name }}</v-col>

          </v-row>
        </v-sheet>
      </v-row>
    </div>
  </div>
</template>

<script>
import { GetSingleContract } from "@/api/request"

export default {
  name: "contract",
  data: () => ({
    data: {},
    showCopyText1: false,
    showCopyText2: false,
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
    getData() {
      this.contract_name = this.$store.state.contract_name
      let params = {
        contract_name: this.contract_name
      }
      GetSingleContract(params).then(res=> {
        this.data = res.data
      })
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
    onSearch() {
    },
  },
};
</script>

<style scoped lang="less">
@import "../../css/detailPages";
</style>
