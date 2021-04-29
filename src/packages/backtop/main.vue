<template>
  <ml-badge></ml-badge>
</template>

<script>
// 使用throttle防抖
import { throttle } from "throttle-debounce";

const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: "MlBacktop",

  props: {
    visibilityHeight: {
      type: Number, // 返回按钮出现的高度
      default: 200,
    },
    target: [String], // 触发滚动的对象
    right: {
      type: Number,
      default: 40, // 右边距
    },
    bottom: {
      type: Number,
      default: 40, // 底边距
    },
  },

  data() {
    return {
      el: null,
      container: null,
      visible: false,
    };
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    },
  },

  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener("scroll", this.throttledScrollHandler);
  },

  methods: {
    // 初始化滚动的父容器
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },

    // 根据滚动高度 判断backtop按钮是否显示
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },

    // 点击回到顶部
    handleClick(e) {
      this.scrollToTop();
      this.$emit("click", e);
    },

    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      // requestAnimationFrame 这里用来执行动画 更加流畅
      const frameFunc = () => {
        // 动画执行时间为500ms
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    },
  },

  beforeDestroy() {
    this.container.removeEventListener("scroll", this.throttledScrollHandler);
  },
};
</script>
