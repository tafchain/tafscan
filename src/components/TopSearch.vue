<template>
  <div class="w1200" v-bind="$attrs" v-on="$listeners">
    <v-card class="search-wrap" flat>
      <v-row no-gutters justify="center">
        <input
          class="search-input"
          type="text"
          autocomplete="false"
          v-model.trim="value"
          :placeholder="placeholder"
        />
        <v-btn
          rounded
          width="120"
          height="44"
          elevation="0"
          class="search-btn ml-4"
          @click="onSearch"
          >{{ $t("text18") }}</v-btn
        >
      </v-row>
      <!--      投票/合约 搜索下方需要显示的数据信息-->
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
import {Search} from "@/api/request"
export default {
  name: "TopSearch",
  data: () => ({
    value: "",
    placeholder: "",
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { placeholder } = this.$attrs;
      this.placeholder = placeholder;
    },
    onSearch() {
      // if (this.value)
      this.$listeners.search && this.$listeners.search(this.value);
      !this.$listeners.search && this.defaultSearch(this.value);
    },
    defaultSearch(value) {
      let params = {
        search_content: value
      }
      Search(params).then(res => {
        const { data_type, block_info, account_info, trans_info } = res.data
        if (!data_type) {
          this.$store.commit('TOGGLE_SNACKBAR', { bool: true, msg: '未查询到匹配结果' } )
          return
        }
        if ( data_type == 1 ) {
          this.$store.dispatch("TO_BLOCK_DETAIL", block_info.block_num)
        }
        if ( data_type == 2 ) {
          this.$store.dispatch("TO_TRADE_DETAIL", trans_info.id)
        }
        if ( data_type == 3 ) {
          this.$store.dispatch("TO_ACCOUNT", account_info.account_name)
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.search-wrap {
  min-height: 100px;
  background: linear-gradient(90deg, #3B3B3B 0%, #242424 100%);
  border-radius: 10px;
  padding: 30px 0;
  .search-input {
    height: 44px;
    width: 540px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #ffffff;
    border-radius: 22px !important;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding: 12px 38px;
  }

  .search-btn {
    background: #ffffff;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3b6ddd;
  }
}
.search-input::-webkit-input-placeholder {
  color: #ffffff !important ;
}
</style>
