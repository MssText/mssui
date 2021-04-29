import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "@/i18n/lang/zh";
import en from "@/i18n/lang/en";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "en",
  messages: {
    en,
    zh,
  },
});
export default i18n;
