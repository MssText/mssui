# 安装

## 使用CDN
对于新手，我们强烈建议使用这种方式使用mssui，能让初学者最快速度上手mssui的组件

::: tip
由于mssui依赖Vue框架，使用这种方式使用mssui时，请确保首先引入了Vue
:::
所以，你需要这样做：
#### 1.引入Vue
```vue
 script src="https://unpkg.com/vue/dist/vue.js"></script>
```
### 2.引入mssui
```vue
  <link rel="stylesheet" href="https://unpkg.com/mssui@0.1.13/lib/theme-chalk/index.css">
  <script src="https://unpkg.com/mssui@0.1.13/lib/index.js"></script>
```

## 使用npm
对于在生产环境中，我们推荐使用npm的方式

### 1.全部引入

首先安装mssuinpm包
```js
npm install mssui
```
然后在你的`main.js`这样使用：
::: tip
样式需要单独引入
:::
```js
import Vue from 'vue'
import App from './App.vue'
import MssUi from 'mssui'
import 'mssui/lib/theme-chalk/index.css'

Vue.use(MssUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
这样引入后，mssui所有的组件就都自动注册为全局组件，你可以在项目的任意页面进行使用

### 1.按需引入
考虑到有的用户只用到mssui的几个组件，但是却要引入所有的组件，所以mssui也提供按需引入的方式
首先，安装babel-plugin-component
```js
npm install babel-plugin-component -D
```
然后在你的`babel.config.js`文件中配置如下：
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env"]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "mssui",
        "styleLibraryName": "theme-chalk",
      }
    ]
  ]
}
```
不如你仅仅使用了`Button`组件，你可以在`main.js`中这样做：
```js
import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mssui'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
然后页面你就可以愉快的使用mssui了