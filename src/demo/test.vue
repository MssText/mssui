<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ml-button icon="ml-icon-search" type="primary">{{ confirm }}</ml-button>
    <ml-button type="info" @click="changeLang">{{ lang }}</ml-button>
  </div>
</template>

<script>
import locale from "@/mixins/locale";
export default {
  name: "test",
  mixins: [locale],
  data() {
    return {
      lang: "点击切换语言",
      msg: "欢迎来到你的 Vue.js App",
      confirm: "确定",
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
        console.log("11111");
        this.$i18n.locale = "en";
        this.lang = "切换为中文";
      } else {
        console.log("触发了这个函数");
        this.$i18n.locale = "zh";
        this.lang = "切换为英语";
      }
      this.msg = this.t("ml.button.msg");
      this.confirm = this.t("ml.button.confirm");
    },
    changeToZh() {
      this.msg = this.$t("ml.button.msg");
      this.confirm = this.$t("ml.button.confirm");
    },
  },
};
</script>

<style scoped></style>
