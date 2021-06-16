<template>
  <div class="page-wrap mt-5 mb-9">
    <v-card class="current-info-wrap" flat>
      <TopSearch :placeholder="$t('text17')" />
      <v-row no-gutters class="mt-3">
        <v-col cols="10">
          <v-row no-gutters justify="space-around" class="data-wrap">
            <v-col
              cols="3"
              v-for="(item, index) in infoItems"
              :key="index"
              :class="['text-center', { mb30: index <= 4 }]"
            >
              <div class="info-title">{{ item.text }}</div>
              <div class="info-data">{{ infoData[item.key] | formatNumber }}</div>
            </v-col>
          </v-row>
        </v-col>
        <!--          投票比例-->
        <v-col cols="2" class="progress-wrap">
          <div class="info-title">{{ $t("text16") }}</div>
          <span class="progress-wrap">
            <v-progress-circular
              :value="infoData.vote_ratio"
              color="#E6B433"
              :size="80"
              :width="12"
              >{{ infoData.vote_ratio }}</v-progress-circular
            >
            <div class="progress-info-wrap">
              <span class="progress-value">{{ infoData.vote_ratio }}</span>
              <span class="progress-per">%</span>
            </div>
          </span>
        </v-col>
      </v-row>
    </v-card>
    <div class="tables-wrap">
      <div class="table-container">
          <vBlockTable :limit="limit" :currentPage="currentPage" />
          <div class="text-center mx-auto default-yellow fsz_11" @click="changeRoute('/block')">
            {{ $t("text27") }}>>
          </div>
      </div>
      <div class="ml-8 table-container">
          <vTradeTable :limit="limit" :currentPage="currentPage" />
          <div class="text-center mx-auto default-yellow fsz_11" @click="changeRoute('/transaction')">
            {{ $t("text27") }}>>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetInfo } from "@/api/request";
export default {
  name: "index",
  data: () => ({
    searchValue: "",
    infoData: {},
    limit: 15,
    currentPage: 1,
    timer: undefined
  }),
  computed: {
    infoItems() {
      return [
        {
          key: 'head_block_num',
          text:this.$t("text19"),
        },
        {
          key: 'trade_num',
          text: this.$t("text20"),
        },
        {
          key: 'account_num',
          text: this.$t("text21"),
        },
        {
          key: 'vote_num',
          text: this.$t("text22"),
        },
        {
          key: 'contract_num',
          text: this.$t("text23"),
        },
        {
          key: 'node_num',
          text: this.$t("text24"),
        },
        {
          key: 'taft_num',
          text: this.$t("text25"),
        },
        {
          key: 'do_votes',
          text: this.$t("text26"),
        }
      ];
    },
  },
  mounted() {
    this.init();
    this.timer = setInterval(()=> {
      this.init()
    }, 5 * 1000)
  },
  methods: {
    init() {
      this.getInfo()
    },
    getInfo(){
      GetInfo().then(res=> {
        this.infoData = res.data
      }).finally(()=> {

      })
    },
    changeRoute(path) {
      this.$router.push(path)
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
};
</script>
<style lang="less" scoped>
.current-info-wrap {
  height: 340px;
  background: linear-gradient(90deg, #3B3B3B 0%, #242424 100%);
  border-radius: 10px;
}
.search-input::-webkit-input-placeholder {
  color: #ffffff !important ;
}
.data-wrap {
  .info-title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 6px;
  }
  .info-data {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}
.progress-wrap {
  max-width: 80px;
  .info-title {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 12px;
  }
}
.mb30 {
  margin-bottom: 30px;
}
.tables-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 10;
  margin-top: -42px;
  .table-container {
    width: 560px;
    height: 100%;
    background: #ffffff;
    box-shadow: 2px 2px 8px 0px rgba(45, 69, 133, 0.17);
    border-radius: 10px;
    overflow: hidden;
    padding-bottom: 10px;
  }
}
/deep/ .hashw150 {
  width: 150px;
}
</style>
