<template>
  <v-card class="block_table" flat v-bind="$attrs">
    <v-card-title class="d-flex justify-center">
      <slot name="title">
        <img src="@/assets/icon_qukuai@2x.png" alt="icon" class="table-icon">
        {{ $t("text2") }}
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
      <template v-slot:item.block_num="{ item }">
        <span class="default-yellow" @click="toDetail(item.block_num)">{{
          item.block_num
        }}</span>
      </template>
      <template v-slot:item.packer="{ item }">
        <div class="d-flex align-center" style="justify-content: center;">
          <div class="text-left pr-2">
            <div class="d-flex">
              {{ $t("text41")}}
              <span class="default-yellow d-block w100 text-truncate"
                    @click="toAccount(item.packer)"
              >
                {{ item.packer }}
              </span>
            </div>
            <div class="d-flex">
              {{ $t("text43") }}
              <span class="default-yellow d-block w100 text-truncate"
                    @click="toAccount(item.verier)"
              >
                {{ item.verier }}
              </span>
            </div>
          </div>
          <div
            class="default-yellow d-flex align-center more ml-1"
            @click="showDetail(item)"
          >
            {{ $t("text74") }}
          </div>
          <v-sheet
            v-if="curHeight === item.block_num"
            class="detail-wrap"
            v-click-outside="{
              handler: onClickOutside,
              include: include,
            }"
          >
            <div>
              {{ $t("text41")}}
              <span class="default-yellow"
                    @click="toAccount(item.packer)"
              >{{ item.packer }}</span>
            </div>
            <div>
              {{ $t("text43") }}
              <span class="default-yellow"
                    @click="toAccount(item.verier)"
              >{{ item.verier }}</span>
            </div>
          </v-sheet>
        </div>
      </template>
      <template v-slot:item.timestamp="{ item }">
        {{ item.timestamp | formatTime }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { GetBlock } from "@/api/request";
export default {
  name: "vBlockTable",
  data: () => ({
    loading: false,
    data: [],
    curHeight: undefined, // 区块高度 用来标记打开哪一行的more
    timer1: undefined,
    timer2: undefined
  }),
  props: ['filterValue'],
  created() {},
  computed: {
    headers() {
      return [
        {
          text: this.$t("text14"),
          align: "center",
          value: "block_num",
        },
        {
          text: this.$t("text75"),
          align: "center",
          value: "packer",
        },
        {
          text: this.$t("text73"),
          align: "center",
          value: "trx_count",
        },
        {
          text: this.$t("text54"),
          align: "center",
          value: "timestamp",
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
    if (this.$route.name == 'home')
      this.timer2 = setInterval(()=> {
        this.init()
      }, 5 * 1000)
  },
  methods: {
    init() {
      this.getData(1);
    },
    include() {
      return [document.querySelector(".more")];
    },
    onClickOutside() {
      this.curHeight = undefined
    },
    getData(page_index, content = '') {
      this.loading = true;
      let data = {
        page_index,
        page_size: this.$attrs.limit,
        content
      }
      GetBlock(data).then(res=> {
        this.data = res.data.data || []
        console.log( this.data )
        this.$emit('update:pageTotal', res.data.page_num)
      }).finally(()=> {
        this.timer1 = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    toDetail(block_num) {
      this.$store.dispatch("TO_BLOCK_DETAIL", block_num)
    },
    showDetail(rowData) {
      this.curHeight = rowData.block_num
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
