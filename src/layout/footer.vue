<template>
  <v-footer padless class="footer-wrap align-start">
    <v-card class="w1000 mx-auto" color="transparent" flat>
      <v-row class="justify-space-between" no-gutters>
        <v-col cols="2" v-for="item in links" :key="item.title">
          <v-card color="transparent" flat class="white--text">
            <v-card-title class="px-0 pt-0">
              <div class="wrap-title">{{ $t(item.title) }}</div>
            </v-card-title>
            <v-card-subtitle class="px-0 pt-2 pb-3">
              <v-divider class="wrap-divider" />
            </v-card-subtitle>
            <v-card-text class="pl-0">
              <ul class="pl-0">
                <li
                  class="wrap-link"
                  v-for="sub in item.subtitle"
                  :key="sub.text"
                >
                  <a
                    class="white--text d-block mb-1"
                    @click="changeRoute(sub)"
                    >{{ $t(sub.text) }}</a
                  >
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "rfooter",
  data: () => ({
    links: [
      {
        title: "text6",
        subtitle: [
          {
            text: "官网",
            href: 'http://www.tafchain.com/'
          },
          {
            text: "text7",
            path: "whitepaper",
            isWhitepaper: true
          },
        ],
      },
      {
        title: "text8",
        subtitle: [
          {
            text: "text9",
            path: "/docs",
          },
          {
            text: "text10",
            // path: 'community'
          },
        ],
      },
      {
        title: "text11",
        subtitle: [
          {
            text: "text12",
            path: 'walletDownload',
            isWallet: true
          },
          {
            text: "text13",
            path: "/faucet",
          },
        ],
      },
    ],
  }),
  methods: {
    changeRoute(subtitle) {
      if (subtitle.href) {
        window.open(subtitle.href, '_blank')
      }
      else if (subtitle.isWhitepaper) {
        window.open('https://www.tafchain.com/img/TAFChain%20%E6%8A%80%E6%9C%AF%E7%99%BD%E7%9A%AE%E4%B9%A61.1.0.pdf', '_blank')
      }
      else if (subtitle.isWallet) {
        window.open('https://www.uvtoken.com/', '_blank')
      }
      else
        this.$router.push(subtitle.path);
    },
  },
};
</script>

<style lang="less" scoped>
.footer-wrap {
  height: 144px;
  padding-top: 30px;
  background: linear-gradient(90deg, #3B3B3B 0%, #242424 100%);
  z-index: 2000;
  .w1000 {
    width: 1000px;
  }
  .wrap-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }

  .wrap-divider {
    width: 60px;
    height: 1px;
    background: #ffffff;
    opacity: 0.39;
  }

  .wrap-link {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }

  .pl85 {
    padding-left: 85px;
  }
}
</style>
