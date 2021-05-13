<template>
  <div>
    <ml-button type="primary" @click="handleMessage('primary')">主要按钮</ml-button>
    <ml-button type="success" @click="handleMessage('success')">成功按钮</ml-button>
  </div>
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
