const path = require('path')
module.exports = {
  title: 'MSS-UI',
  description: 'A UI library',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/mssui.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/start' },
      { text: '文档', link: 'http://air-ui.xxx.com' },
      { text: 'GitHub', link: 'http://gitlab.xxx.com' }
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
        "@": path.resolve(process.cwd(), "./src")
      }
    }
  }
}