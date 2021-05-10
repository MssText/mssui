import zh_CN from "@/locale/lang/zh-CN";
import { format } from "@/utils/format";
// import deepmerge from "deepmerge";
import Vue from "vue";
import { isDef } from "@/utils/index";

let lang = zh_CN;
// let merged = false;
let vuei18n = null;
let i18nHandler = function () {
  vuei18n = (this || Vue).$i18n || vuei18n;
  if (vuei18n && vuei18n.locale) {
    // if (!merged) {
    //   merged = true;
    //   let curLocalMessage = vuei18n.getLocaleMessage(vuei18n.locale) || {};
    //   let newLocalMessage = {};
    //   console.log("curLocalMessage的值：", curLocalMessage);
    //   deepmerge(newLocalMessage, curLocalMessage, { clone: true });
    //   console.log(
    //     "newLocalMessage的值：",
    //     deepmerge(newLocalMessage, curLocalMessage, { clone: true })
    //   );
    //   lang = newLocalMessage;
    //   vuei18n.setLocaleMessage(vuei18n.locale, newLocalMessage);
    // }
    return vuei18n.t(...arguments);
  }
};

const t = function (path, options) {
  let value;
  value = i18nHandler.apply(this, arguments);
  if (isDef(value)) return value;

  const array = path.split(".");
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return "";
    current = value;
  }
  return "";
};

const use = function (l) {
  lang = l || lang;
};

const i18n = function (initI18n) {
  vuei18n = initI18n;
};

export default {
  use,
  t,
  i18n,
  lang,
};
