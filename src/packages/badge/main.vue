<template>
  <div class="ml-badge">
    <slot></slot>
    <transition name="ml-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="ml-badge__content"
        :class="[
          'ml-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
      >
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MlBadge",

  props: {
    value: [String, Number], // 右上角展示的值
    max: Number, // 展示的最大值
    isDot: Boolean, // 展示小圆点
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return (
          ["primary", "success", "warning", "info", "danger"].indexOf(val) > -1
        );
      },
    },
  },

  computed: {
    content() {
      if (this.isDot) return;

      const value = this.value;
      const max = this.max;

      if (typeof value === "number" && typeof max === "number") {
        return max < value ? `${max}+` : value;
      }

      return value;
    },
  },
};
</script>
