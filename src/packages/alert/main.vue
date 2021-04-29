<template>
  <div class="ml-alert" :class="[typeClass]" v-show="visible">
    <i class="ml-alert__icon" :class="[iconClass]" v-if="showIcon"></i>
    <div class="ml-alert__content">
      <span class="ml-alert__title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </span>
      <i
        class="ml-alert__closebtn"
        :class="{
          'ml-icon-close': closeText === '',
        }"
        v-show="closable"
        @click="close()"
        >{{ closeText }}</i
      >
    </div>
  </div>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  success: "ml-icon-success",
  warning: "ml-icon-warning",
  error: "ml-icon-error",
};
export default {
  name: "MlAlert",

  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: "",
    },
    showIcon: Boolean,
    center: Boolean,
  },

  data() {
    return {
      visible: true,
    };
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },

  computed: {
    typeClass() {
      return `ml-alert--${this.type}`;
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || "ml-icon-info";
    },
  },
};
</script>
