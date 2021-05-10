import components from "@/components";
import MlMessage from "@/packages/message/index";
import locale from "@/locale";

const MElement = {
  install: function (Vue, opts = {}) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });

    // 全局挂载组件方法
    Vue.prototype.$message = MlMessage;

    // 国际化处理 兼容vuei18n
    if (opts.locale) {
      locale.use(opts.locale);
    }
    if (opts.i18n) {
      locale.i18n(opts.i18n);
    }

    // 全局的默认配置
    Vue.prototype.$MlElement = {
      size: opts.size,
    };
  },
  // 每个组件单独导出
  ...components,
};

// 支持CDN引入
if (typeof window !== "undefined" && window.Vue) {
  MElement.install(window.Vue);
}

export default MElement;
