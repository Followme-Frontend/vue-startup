import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';
import hk from './zh-HK';

Vue.use(VueI18n);
const lang = typeof FMLocale === 'function' ? FMLocale() : 'zh-CN';
window.FMLang = lang || 'zh-CN';

export default new VueI18n({
    locale: lang,
    fallbackLocale: 'zh-CN',
    messages: {
        'zh-CN': cn,
        'en-US': en,
        'zh-HK': hk
    }
});
