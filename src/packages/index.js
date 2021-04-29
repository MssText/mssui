import components from "@/components";
import MlMessage from "@/packages/message/index";

const MElement = {
  install: function (Vue, opts = {}) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });

    // 全局挂载组件方法
    Vue.prototype.$message = MlMessage;

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
