<template>
  <div>
    <ml-button type="text" @click="handleMessage('primary')">消息</ml-button>
    <ml-button type="text" @click="handleMessage('success')">成功</ml-button>
    <ml-button type="text" @click="handleMessage('warning')">警告</ml-button>
    <ml-button type="text" @click="handleMessage('error')">错误</ml-button>
  </div>
</template>

<script>
  export default {
    name: 'message-demo-base',
    methods: {
      handleMessage (type) {
        let message = type == 'success' ? '成功' 
        : type == 'primary' ? '主要' :  type == 'warning' ? '警告' : '错误'
        this.$message({
          message: `这是一个条${message}消息`,
          type: type == 'success' ? 'success' : type == 'primary' ? 'primary' :  type == 'warning' ? 'warning' : 'error'
        })
      }
    }
  }
</script>
