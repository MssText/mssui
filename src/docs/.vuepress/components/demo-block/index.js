import DemoBlock from './demo-block.vue'

DemoBlock.install = function(Vue) {
  Vue.component(DemoBlock.name, DemoBlock);
}
export default DemoBlock;