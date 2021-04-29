import MlTag from "./main";

/* istanbul ignore next */
MlTag.install = function (Vue) {
  Vue.component(MlTag.name, MlTag);
};

export default MlTag;
