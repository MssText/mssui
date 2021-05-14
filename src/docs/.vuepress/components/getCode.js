import { stripScript, stripStyle, stripTemplate } from '@/utils'

export default {
  methods: {
    goCodepen () {
      const { script, html, style } = this.codepen
      const resourcesTpl = `
<script src="https://unpkg.com/vue/dist/vue.js"><\/script>
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/mssui@0.1.13/lib/theme-chalk/index.css">
<script src="https://unpkg.com/mssui@0.1.13/lib/index.js"></script>
<div id="app">
 ${html}
</div>
`
      let jsTpl = (script || '').replace(/export default/, 'var Main =').trim()
      let cssTpl=`${(style||'')}`
      jsTpl = jsTpl
        ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
        : 'new Vue().$mount(\'#app\')'
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: resourcesTpl
      }
      // see： https://blog.codepen.io/documentation/prefill/
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://codepen.io/pen/define/'
      form.target = '_blank'
      form.style.display = 'none'

      const input = document.createElement('input')
      input.setAttribute('name', 'data')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', JSON.stringify(data))
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()

      document.body.removeChild(form)
    }
  }
}
