<template>
  <span :class="[avatarClass]" :style="[sizeStyle]">
    <img
      v-if="isImageExist && src"
      :src="src"
      :onError="handleError"
      :alt="alt"
      :style="[{ 'object-fit': fit }]"
    />
    <i v-if="icon && !isImageExist && !src" :class="icon" />
    <slot v-else />
  </span>
</template>

<script>
export default {
  name: "MlAvatar",
  props: {
    shape: {
      // 设置图像的形状
      type: String,
      default: "circle",
      validator(val) {
        return ["circle", "square"].includes(val);
      },
    },
    size: [Number, String], // 头像的大小
    icon: String, // 设置图标的头像类型
    src: String, // 图片头像的资源地址
    alt: String, // 描述图像的替换文本
    error: Function, // 图像加载失败回调
    fit: {
      // 同原生的fit属性
      type: String,
      default: "cover",
    },
  },
  data() {
    return {
      isImageExist: false, // 图像是否存在
    };
  },
  methods: {
    handleError() {
      const { error } = this;
      const errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
  },
  computed: {
    avatarClass() {
      const { icon, shape } = this;
      let classList = ["ml-avatar"];

      if (icon) {
        classList.push("ml-avatar--icon");
      }

      if (shape) {
        classList.push(`ml-avatar--${shape}`);
      }

      return classList;
    },
    sizeStyle() {
      const { size } = this;
      return typeof size === "number"
        ? {
            height: `${size || 60}px`,
            width: `${size || 60}px`,
            lineHeight: `${size || 60}px`,
          }
        : {};
    },
  },
};
</script>
