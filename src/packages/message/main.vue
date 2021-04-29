<template>
  <transition name="ml-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'ml-message',
        type && !iconClass ? `ml-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p class="ml-message__content">
          {{ message }}
        </p>
      </slot>
      <i
        v-if="showClose"
        class="ml-message__closeBtn ml-icon-close"
        @click="close"
      ></i>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default {
  name: "MlMessage",
  data() {
    return {
      visible: false, // 是否显示
      message: "", // 提示的文字
      duration: 3000, // 动画的时间
      type: "info",
      iconClass: "",
      customClass: "", // 自定义的类名
      onClose: null, // 关闭的回调函数
      showClose: false,
      closed: false, // 是否关闭
      verticalOffset: 20, // 距离顶部的距离
      timer: null, // 计时器
      dangerouslyUseHTMLString: false, // 是否作为HTML片段展示
      center: false,
    };
  },

  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `ml-message__icon ml-icon-${typeMap[this.type]}`
        : "";
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },

  methods: {
    // 动画结束后销毁当前实例
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    },
  },
  mounted() {
    this.startTimer();
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  },
};
</script>
