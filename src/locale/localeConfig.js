import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import ja from './ja.json'
import zh from './zh.json'
Vue.use(VueI18n)

console.log(navigator.language)
let defaultLang =  navigator.language
if (defaultLang == 'zh-CN') defaultLang = 'zh'

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || defaultLang || 'zh',
  messages: {
    en,
    zh,
    ja
  }
})

export default i18n
