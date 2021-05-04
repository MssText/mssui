<template>
  <div 
      class="demo-block"
      :class="[
      customClass ? customClass : '',
      { 'demo-not-bordered': noBorder }]">
    <div class="source">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'DemoBlock',
    props: {
      noBorder: Boolean,
      customClass: String
    },
  }
</script>

<style lang="scss">
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    margin-top: 10px;
    transition: .2s;
    .air-row {
      margin-bottom: 20px;
      &:last-child {
         margin-bottom: 0;
       }
    }
    .air-button-group {
      .air-button+.air-button {
        margin-left: 0;
      }
    }
    .source {
      padding: 24px;
    }
  }
  .demo-not-bordered{
    border: 0;
    .source {
      padding: 0;
    }
  }
</style>
