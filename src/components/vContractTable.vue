<template>
  <v-card flat v-bind="$attrs">
    <v-card-title class="d-flex justify-center">
      {{ $t("text5") }}
    </v-card-title>
    <v-data-table
      :disable-sort="true"
      :no-data-text="$t('text65')"
      hide-default-footer
      :headers="headers"
      :items-per-page="$attrs.limit"
      :items="data"
      :loading="loading"
      loading-text="Loading..."
    >
      <template v-slot:item.name="{ item }">
        <span class="default-yellow" @click="toDetail(item.name)">{{
          item.name
        }}</span>
      </template>
      <template v-slot:item.trade_num="{ item }">
        {{ item.trade_num | formatNumber }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { GetContract } from "@/api/request"

export default {
  name: "vContractTable",
  data: () => ({
    loading: false,
    data: [],
    timer: undefined
  }),
  props: ['filterValue'],
  created() {
    console.log(this.$attrs);
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("text72"),
          align: "center",
          value: "name",
        },
        {
          text: this.$t("text73"),
          align: "center",
          value: "trade_num",
        },
        {
          text: this.$t("text39"),
          align: "center",
          value: "actions",
        },
      ];
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
  },
  methods: {
    init() {
      this.getData();
    },
    getData(page_index, content = '') {
      this.loading = true;
      let data = {
        page_index,
        page_size: this.$attrs.limit,
        content
      }
      GetContract(data).then(res=> {
        this.data = res.data.data || []
        this.$emit('update:pageTotal', res.data.page_num)
        this.$emit('update:common', res.data.common)
        this.$emit('update:system', res.data.system)
      }).finally(()=> {
        this.timer = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    toDetail(contract_name) {
      this.$store.dispatch("TO_CONTRACT_DETAIL", contract_name)
    }
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  }
};
</script>

<style scoped lang="less">
.detail {
  min-width: 500px;
  position: absolute;
  z-index: 3000;
  padding: 16px;
  left: 50%;
  transform: translate(-50%);
  text-align: left;
  background: #ffffff;
  box-shadow: 2px 2px 8px 0px rgba(45, 69, 133, 0.17);
}
</style>
