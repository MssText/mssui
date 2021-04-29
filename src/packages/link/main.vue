<template>
  <a
    :class="[
      'ml-link',
      type ? `ml-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline',
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>

    <span v-if="$slots.default" class="ml-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template>
  </a>
</template>

<script>
export default {
  name: "MlLink",

  props: {
    type: {
      type: String,
      default: "default", // 下划线的类型
    },
    underline: {
      type: Boolean,
      default: true, // 是否有下划线
    },
    disabled: Boolean, // 是否禁用
    href: String, //同原生herf属性
    icon: String, // 图标
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit("click", event);
        }
      }
    },
  },
};
</script>
