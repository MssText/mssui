<template>
  <div class="hello">
    <h1>{{ $t("buttonSuccess.msg") }}</h1>
    哈哈哈
    <ml-divider></ml-divider>
    哈哈哈
    <ml-button type="primary" @click="changeLang">{{
      $i18n.locale === "zh" ? "切换为英文" : "切换成中文"
    }}</ml-button>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    msg: String,
  },
  data() {
    return {
      lang: "",
    };
  },
  methods: {
    open() {
      this.$message({
        type: "error",
        showClose: true,
        message: "这是一条消息提示",
      });
    },
    changeLang() {
      if (this.$i18n.locale === "zh") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
    },
  },
};
</script>

<style scoped></style>
