import Vue from "vue";
import App from "./App.vue";
// import "@/config/index";

import MlElement from "../lib/ml-element-ui.common.js";
// import "@/theme/index.scss";
import "../lib/theme-chalk/index.css";
import i18n from "@/i18n/index";

Vue.use(MlElement);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
