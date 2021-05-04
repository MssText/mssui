# Message 提示

常用的操作按钮

## 基础用法

基础的按钮用法

<ClientOnly>
 <message-demo-base></message-demo-base>
</ClientOnly>

::: tip

可以直接通过`this.$message`进行调用

:::

```vue
<template>
    <ml-button type="primary" @click="handleMessage('primary')">主要按钮</ml-button>
    <ml-button type="success" @click="handleMessage('success')">成功按钮</ml-button>
</template>

<script>
  export default {
    name: 'message-demo-base',
    methods: {
      handleMessage (type) {
        this.$message({
          message: type == 'success' ? '这是一条普通的消息' : '这是一条成功的消息',
          type: type == 'success' ? 'success' : 'primary'
        })
      }
    }
  }
</script>
```