<template>
  <v-card class="block_table" flat v-bind="$attrs">
    <v-card-title class="d-flex justify-center">
      <slot name="title">
        <img src="@/assets/icon_zhanghu@2x.png" alt="icon" class="table-icon">
        {{ $t("text76") }}
        </slot>
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
      <template v-slot:item.name="{ item }">
        <span class="default-yellow text-truncate"
              @click="toAccount(item.name)"
        >
            {{ item.name }}
        </span>
      </template>
      <template v-slot:item.create_time="{ item }">
        {{ item.create_time | formatTime }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { GetAccountList } from "@/api/request";
export default {
  name: "vAccountTable",
  data: () => ({
    loading: false,
    data: [],
    timer: undefined
  }),
  props: ['filterValue'],
  created() {},
  computed: {
    headers() {
      return [
        {
          text: this.$t("text76"),
          align: "center",
          value: "name",
        },
        {
          text: this.$t("text77"),
          align: "center",
          value: "create_time",
        }
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
      // this.getData();
    },
    getData(page_no, content = '') {
      this.loading = true;
      let data = {
        page_no,
        page_size: this.$attrs.limit,
        content
      }
      GetAccountList(data).then(res=> {
        this.data = res.data.accounts || []
        console.log( this.data )
        let pageTotal = Math.ceil(res.data.total / Number(this.$attrs.limit)) || 1

        this.$emit('update:pageTotal', pageTotal)
      }).finally(()=> {
        this.timer = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    },
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  }
};
</script>

<style scoped lang="less">
.detail-wrap {
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

.w100 {
  max-width: 100px;
}
.test123 {
  color:red;
}
/deep/.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  font-size: 11px;
}
</style>
