<template>
  <v-app-bar app height="70px" class="head rounded-0" min-width="100%" fixed>
    <div class="w1200 mx-auto nav-wrap d-flex justify-start align-center">
      <v-img
        class="flex-grow-0 ml-11"
        src="../assets/pic_logo.png"
        alt="logo"
        height="40"
        width="130"
        @click="$router.push('/')"
      />
      <div
        class="d-flex justify-start nav-container text-no-wrap align-center"
        @mouseleave="currentIdx = -1"
      >
        <div
          v-for="(item, index) in navItems"
          :key="item.text"
          :class="['nav-block', 'nav-block-' + index]"
          @mouseenter="currentIdx = index"
        >
          <a :class="['nav-text borderLeftRight', {'active': clicked == item.path}]"
             @click="changeRoute(item.path)"
          >
            <span>{{ $t(item.text) }}</span>
            <v-icon v-if="index === 1" dark x-small class="chevron-down">
              mdi-chevron-down
            </v-icon>
          </a>
          <v-expand-transition>
            <div class="nav-submenu-wrap transition-fast-in-fast-out"
                 v-show="index === 1 && currentIdx === index"
            >
              <a
                class="nav-submenu  transition-fast-in-fast-out"
                v-for="sub in item.children"
                :key="sub.text"
              >
                <span :class="['white--text borderLeftRight',
                        {'active': clicked == sub.path}]"
                      @click="changeRoute(sub.path)">{{ $t(sub.text) }}</span>
              </a>
            </div>
          </v-expand-transition>
        </div>
      </div>
      <div
        class="lang-wrap ml-auto text-no-wrap"
        @mouseleave="showLangMenu = false"
      >
        <div class="nav-lang-container" @mouseenter="showLangMenu = true">
          <v-img class="mr-2" :src="navLangFlag"></v-img>
          {{ navLangName }}
          <v-icon class="menu-down" medium dark>mdi-menu-down</v-icon>
        </div>
        <v-expand-transition>
          <div
            class="lang-submenu-wrap transition-fast-in-fast-out"
            v-show="showLangMenu"
          >
            <div
              v-for="(item, index) in menuLang"
              :key="index"
              @click="selectLang(item)"
              class="lang-submenu"
            >
              <v-img
                class="mr-2"
                :src="item.src"
                max-width="20"
                max-height="20"
              ></v-img>
              {{ item.name }}
            </div>
          </div>
        </v-expand-transition>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "rheader",
  data: () => ({
    clicked: '',
    navLangFlag: "",
    navLangName: "",
    menuLang: [
      {
        src: require("../assets/icon_zg.png"),
        name: "中文",
        type: "zh",
      },
      // {
      //   src: require("../assets/icon_yw.png"),
      //   name: "English",
      //   type: "en",
      // },
      // {
      //   src: require("../assets/icon_alb.png"),
      //   name: "عربى",
      //   type: "ar",
      // },
      // {
      //   src: require("../assets/icon_ry.png"),
      //   name: "日本語",
      //   type: "ja",
      // },
      // {
      //   src: require("../assets/icon_yw.png"),
      //   name: "한국어",
      //   type: "ko",
      // },
      // {
      //   src: require("../assets/icon_yw.png"),
      //   name: "русский",
      //   type: "ru",
      // },
    ],
    map: {
      zh: ["中文", "Chinese"],
      en: ["English", "English"],
      ar: ["عربى", "Arabic"],
      ja: ["日本語", "Japanese"],
      ko: ["한국어", "Korean"],
      ru: ["русский", "Russian"],
    },
    currentIdx: -1,
    showLangMenu: false,
    navItems: [
      {
        text: "text1",
        path: "/",
      },
      {
        text: "text2",
        path: "/block",
        children: [
          {
            text: "text3",
            path: "/transaction",
          },
          {
            text: "text76",
            path: "/account",
          },
        ],
      },
      {
        text: "text4",
        path: "/vote",
      },
      {
        text: "text5",
        path: "/contract",
      },
    ],
  }),
  watch: {
    '$route': {
      handler(cur) {
        this.$nextTick(()=> {
          this.clicked = cur.path
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initLangNav();
  },
  methods: {
    initLangNav() {
      if (localStorage.getItem("lang")) {
        let type = localStorage.getItem("lang");
        this.navLangName = this.map[type][0]; // English ...
        this.navLangFlag = this.menuLang.find((el) => el.type === type).src;
        return;
      }
      let defaultLang =  navigator.language
      if (defaultLang == 'zh-CN') defaultLang = 'zh'
      const { name, src, type } = this.menuLang.find((el) => el.type === defaultLang);
      this.navLangName = name;
      this.navLangFlag = src;
      localStorage.setItem("lang", type); // zh en ja ar
    },
    selectLang({ src, name, type }) {
      this.navLangFlag = src;
      this.navLangName = name;
      this.changeLocale(type);
    },
    changeLocale(type) {
      this.$i18n.locale = type; // en zh ...
      localStorage.setItem("lang", type);
      this.$vuetify.lang.current = "type";
    },
    changeRoute(path) {
      this.clicked = path
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../css/header";
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
}
.head {
  background: linear-gradient(90deg, #3B3B3B 0%, #242424 100%);
  z-index: 10000 !important;
  .nav-wrap {
    height: 100%;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;

    .nav-container {
      cursor: pointer;
      height: 100%;
    }

    .nav-block {
      color: #fff;
      margin-right: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-0 {
        margin-left: 80px;
      }
      &-1 :hover .chevron-down {
        transform: rotate(180deg);
      }
      .nav-submenu-wrap {
        position: absolute;
        min-width: 130px;
        top: 60px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        font-family: PingFangSC-Semibold, PingFang SC;

        .nav-submenu {
          height: 60px;
          line-height: 60px;
          background: #313131;
          cursor: pointer;
          display: block;
          color: #FFFFFF;
          font-weight: 400;
          &:hover {
            font-weight: 600;
          }
          span.active { // 保持激活css
            &::after {
              transform: scaleX(1);
              transform-origin: bottom left;
            }
          }
        }
      }
    }

    .nav-text {

      font-weight: 400;
      display: block;
      color: #FFFFFF;
      &:hover {
        font-weight: 600;
      }
      &.active { // 保持激活css
        &::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      }
    }
    .lang-wrap {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 57px;
      &:hover .menu-down {
        transform: rotate(180deg);
      }
      .nav-lang-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
      }
      .lang-submenu-wrap {
        position: absolute;
        min-width: 160px;
        top: 60px;
        background: #313131;
        width: 160px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .lang-submenu {
          display: flex;
          justify-content: flex-start;
          height: 54px;
          align-items: center;
          padding-left: 48px;
          &:hover {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
