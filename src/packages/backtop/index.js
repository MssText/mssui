import MlBacktop from "./main";

/* istanbul ignore next */
MlBacktop.install = function (Vue) {
  Vue.component(MlBacktop.name, MlBacktop);
};

export default MlBacktop;
