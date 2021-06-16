<template>
  <div class="page-wrap">
    <TopSearch :placeholder="$t('text17')" />
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
        ><span>{{ userInfo.account_name }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="duserInfo.account_name"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText1 = true"
                @mouseleave="showCopyText1 = false"
                v-clipboard:copy="duserInfo.account_name"
            />
          </template>
          <span v-show="!showCopyText1">点击复制</span>
          <span v-show="showCopyText1">已复制</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text30") }}</span
        ><span>{{ userInfo.public_key }}</span>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
                v-show="userInfo.public_key"
                class="copy"
                max-width="20"
                src="@/assets/copy.png"
                contain
                v-bind="attrs"
                v-on="on"
                @click="showCopyText2 = true"
                @mouseleave="showCopyText2 = false"
                v-clipboard:copy="userInfo.public_key"
            />
          </template>
          <span v-show="!showCopyText2">点击复制</span>
          <span v-show="showCopyText2">已复制</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text31") }}</span
        ><span>{{userInfo.balance }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text32") }}</span
        ><span>{{ userInfo.creator }}</span>
      </v-row>
      <v-row no-gutters class="pl-1">
        <span>{{ $t("text33") }}</span
        ><span>{{ userInfo.create_time | formatTime }}</span>
      </v-row>
      <!--账户交易-->
      <v-row no-gutters class="pl-1">
        <div
          class="part-title d-flex justify-start align-center decoration-line"
        >
          <div class="mr-2">{{ $t("text34") }}</div>
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
                 v-for="row in userInfo.trade_data"
                 :key="row.id"
          >
            <v-col cols="2">
              <span class="default-yellow" @click="toTradeDetail(row.id)">
                {{ row.id }}
              </span>
            </v-col>
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
            <v-col cols="2">
              <span class="default-yellow" @click="toContractDetail(row.contract_name)">
                {{ row.contract_name }}
              </span>
            </v-col>
            <v-col class="text-left" cols="4">
              <code>{{ JSON.parse(row.origin_data) }}</code>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </div>
  </div>
</template>

<script>
import { GetAccount } from "@/api/request"
export default {
  name: "accountDetail",
  data: () => ({
    userInfo: {},
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
      this.getData();
    },
    update() {},
    getData() {
      let data = {
        account_name: this.$store.state.account
      }
      GetAccount(data).then(res=> {
        console.log( res )
        this.userInfo = res.data
      })
    },
    toTradeDetail(id){
      this.$store.dispatch("TO_TRADE_DETAIL", id)
    },
    toContractDetail(contract_name){
      this.$store.dispatch("TO_CONTRACT_DETAIL", contract_name)
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
  },
};
</script>

<style scoped lang="less">
@import "../../css/detailPages";
</style>
