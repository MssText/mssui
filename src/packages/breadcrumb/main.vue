<template>
  <div class="ml-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "MlBreadcrumb",

  props: {
    separator: {
      type: String,
      default: "/", // 普通分隔符
    },
    separatorClass: {
      type: String,
      default: "", // 图标分隔符
    },
  },

  provide() {
    return {
      mlBreadcrumb: this,
    };
  },

  mounted() {
    // const items = this.$ml.querySelectorAll(".ml-breadcrumb__item");
    // if (items.length) {
    //   // 一组页面中的当前页面
    //   items[items.length - 1].setAttribute("aria-current", "page");
    // }
  },
};
</script>
