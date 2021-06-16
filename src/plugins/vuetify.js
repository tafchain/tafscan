import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'
import ja from 'vuetify/es5/locale/ja'
import ru from 'vuetify/es5/locale/ja'
import ko from 'vuetify/es5/locale/ko'
import ar from 'vuetify/es5/locale/ar'

export default new Vuetify({lang: {
    locales: { zhHans, en, ja, ru, ko, ar },
    current: 'zhHans',
  },
});
