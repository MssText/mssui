<template>
  <span class="ml-breadcrumb__item">
    <span :class="['ml-breadcrumb__inner', to ? 'is-link' : '']" ref="link">
      <slot></slot>
    </span>
    <i
      v-if="separatorClass"
      class="ml-breadcrumb__separator"
      :class="separatorClass"
    ></i>
    <span v-else class="ml-breadcrumb__separator">{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: "MlBreadcrumbItem",
  props: {
    to: {},
    replace: Boolean,
  },
  data() {
    return {
      separator: "", // 普通分隔符
      separatorClass: "", // 图标分隔符
    };
  },

  inject: ["mlBreadcrumb"],

  mounted() {
    this.separator = this.mlBreadcrumb.separator;
    this.separatorClass = this.mlBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.addEventListener("click", () => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  },
};
</script>
