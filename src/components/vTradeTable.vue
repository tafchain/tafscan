<template>
  <v-card flat v-bind="$attrs">
    <v-card-title class="d-flex justify-center">
      <img src="@/assets/icon_jiaoyi@2x.png" alt="icon" class="table-icon">
      <slot name="title">{{ $t("text3") }}</slot>
    </v-card-title>
    <v-data-table
      :disable-sort="true"
      :no-data-text="$t('text65')"
      hide-default-footer
      :headers="headers"
      :items-per-page="$attrs.limit"
      :items="data"
      fixed-header
      :loading="loading"
      loading-text="Loading..."
    >
      <template v-slot:item.id="{ item }">
        <div class="hashw150 text-truncate">
          <span class="default-yellow" @click="toDetail(item.id)">
            {{ item.id }}
          </span>
        </div>
      </template>
      <template v-slot:item.amount="{ item }">
        {{ item.amount || 0 }}
      </template>
      <template v-slot:item.timestamp="{ item }">
        {{ item.timestamp | formatTime }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { GetTrade } from "@/api/request";

export default {
  name: "vTradeTable",
  data: () => ({
    loading: false,
    data: [],
    timer1: undefined,
    timer2: undefined
  }),
  props: [ "tradePageHeaders", 'filterValue'], //tradePageHeaders => 首页与/trade虽共用这个组件 但标题列有不同
  created() {},
  computed: {
    headers() {
      return (
        this.tradePageHeaders || [
          {
            text: this.$t("text60"),
            align: "center",
            value: "id",
            width: 150
          },
          {
            text: this.$t("text38"),
            align: "center",
            value: "contract_name",
          },
          {
            text: this.$t("text37"),
            align: "center",
            value: "amount",
          },
        ]
      );
    },
  },
  watch: {
    '$attrs.currentPage': {
      handler(cur) {
        cur = cur || 1
        this.getData(cur);
      },
      immediate: true
    },
    'filterValue': {
      handler(cur) {
        this.getData(1, cur.val)
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.name == 'home')
      this.timer2 = setInterval(()=> {
        this.init()
      }, 5 * 1000)
  },
  methods: {
    init() {
      this.getData(1);
    },
    getData(page_index, content = '') {
      this.loading = true;
      let data = {
        page_index,
        page_size: this.$attrs.limit,
        content
      }
      GetTrade(data).then(res=> {
        this.data = res.data.data || []
        this.$emit('update:pageTotal', res.data.page_num)
      }).finally(()=> {
        this.timer1 = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    toDetail(id) {
      this.$store.dispatch("TO_TRADE_DETAIL", id)
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
  },
  beforeDestroy(){
    clearTimeout(this.timer1)
    clearInterval(this.timer2)
  }
};
</script>

<style scoped lang="less">
.w70 {
  max-width: 70px;
}
/deep/.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  font-size: 11px;
}
</style>
