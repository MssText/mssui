import Vue from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import zh_CN from "@/locale/lang/zh-CN";
import en_US from "@/locale/lang/en-US";

// import MlElement from "../lib/ml-element-ui.common.js";
import MlElement from "@/packages/index";
import "../lib/theme-chalk/index.css";

const messages = {
  en: en_US,
  zh: zh_CN,
};
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh", // 默认使用中文
  messages,
});

Vue.use(MlElement, { i18n });
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
