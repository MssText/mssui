<template>
  <button
    class="ml-button"
    @click="handleClick"
    :disabled="buttonDisabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'ml-button--' + type : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <i class="ml-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"> <slot></slot></span>
  </button>
</template>
<script>
export default {
  name: "MlButton",

  props: {
    type: {
      type: String,
      default: "default",
    },
    size: String,
    icon: {
      type: String,
      default: "",
    },
    nativeType: {
      type: String,
      default: "button",
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },

  computed: {
    buttonDisabled() {
      return this.disabled || this.loading;
    },
  },

  methods: {
    handleClick(event) {
      this.$emit("click", event, "这是Button组件");
    },
  },
};
</script>
<style lang="scss" scoped></style>
