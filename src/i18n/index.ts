
import { createI18n } from 'vue-i18n'
import zh from "./zh"; // 引入zh.js 模块
import en from "./en"; // 引入en.js 模块

const i18n = createI18n({
  locale: "en", // 设置当前语言类型
  fallbackLocale: "en", // 设置备用语言
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: {
    zh,
    en,
  },
});

// setup i18n instance with glob
export default i18n