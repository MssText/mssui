<template>
  <i :class="'ml-icon-' + name"></i>
</template>

<script>
export default {
  name: "MlIcon",

  props: {
    name: String,
  },
};
</script>
