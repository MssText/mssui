const path = require('path')
module.exports = {
  title: 'MSS-UI',
  description: 'A UI library build by Vue 2.0',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/mssui.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/component/Instroduce' },
      { text: 'GitHub', link: 'https://github.com/MssText/mssui' }
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: false,
        children: [
          '/component/Instroduce',
          '/component/Start',
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          {
            title: '通用',
            collapsable: false,
            children: [
              '/component/Button',
              '/component/Message',
            ]
          }
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      }
    }
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
    },
    '/zh/': {
      lang: '简体中文',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  }
}