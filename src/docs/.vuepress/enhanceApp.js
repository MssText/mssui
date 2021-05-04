import DemoBlock from './components/demo-block'
import components from '@/components.js'
import Message from '@/packages/message/index'
import '../../theme/index.scss'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
  }) => {
    components.forEach(component => {
      Vue.component(component.name, component);
    })
    Vue.prototype.$message = Message
    Vue.component(DemoBlock.name, DemoBlock);
}
