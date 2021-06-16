<template>
  <div class="faucet">
    <div class="page-container">
      <v-row no-gutters justify="center" class="search-wrap">
        <input
          type="text"
          class="search-input"
          v-model.trim="searchValue"
          :placeholder="$t('text50')"
        />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="search-btn">
              {{ $t(items[selected].text) }}
              <v-icon color="#E6B433" v-bind="attrs" v-on="on" class="py-1"
                >mdi-menu-down</v-icon
              >
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group
              v-model="selected"
              color="#E6B433"
              mandatory
              @change="onSelect"
            >
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title class="default-yellow">{{
                  $t(item.text)
                }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "faucet",
  data: () => ({
    searchValue: "",
    selected: 0, // 选项的index 默认选择第一项
    items: [
      {
        text: "text51",
      },
      {
        text: "text52",
      },
      {
        text: "text53",
      },
    ],
  }),
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {},
    onSelect(index) {
      this.selected = index;
    },
    onSearch() {
      // TopSearch 触发的
    },
  },
};
</script>

<style scoped lang="less">
.page-container {
  height: 660px;
  width: 100%;
  margin: 85px 0 121px 0;
  background: url("../../assets/pic_bg.png") center center no-repeat;
  padding-top: 255px;
}
.search-wrap {
  .search-input {
    padding: 12px 38px;
    width: 560px;
    height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    border: 1px solid #ffffff;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding: 12px 38px;
    margin-right: 20px;
  }
  .search-btn {
    background: #ffffff;
    font-size: 14px;
    width: 140px;
    border-radius: 5px;
    height: 44px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E6B433;
  }
}
.search-input::-webkit-input-placeholder {
  color: #ffffff !important ;
  font-weight: 400 !important ;
}
</style>
