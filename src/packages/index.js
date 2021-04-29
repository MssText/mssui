import components from "@/components";
import MlMessage from "@/packages/message/index";

const MElement = {
  // eslint-disable-next-line no-unused-vars
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

export default MElement;
