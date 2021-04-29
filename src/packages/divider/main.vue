<template functional>
  <div :class="['ml-divider', `ml-divider--${props.direction}`]">
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['ml-divider__text', `is-${props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// 这是函数式组件
export default {
  name: "MlDivider",
  props: {
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      },
    },
    contentPosition: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].indexOf(val) !== -1;
      },
    },
  },
};
</script>
