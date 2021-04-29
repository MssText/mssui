<template>
  <div
    class="ml-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'"
  >
    <div class="ml-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="ml-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MlCard",
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String,
    },
  },
};
</script>
