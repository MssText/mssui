<template>
<div>
  <ml-button @click="handleClick('text')">默认按钮</ml-button>
  <ml-button type="primary" @click="handleClick('primary')">主要按钮</ml-button>
  <ml-button type="success" @click="handleClick('success')">成功按钮</ml-button>
</div>
</template>

<script>
  export default {
    name: 'button-demo-base',
    methods: {
      handleClick(type) {
        this.$message.success(`点击了按钮！😂😄`)
      }
    }
  }
</script>


