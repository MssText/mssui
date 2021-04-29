<script>
export default {
  name: "MlTag",
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: "light",
      validator(val) {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit("close", event);
    },
    handleClick(event) {
      this.$emit("click", event);
    },
  },
  computed: {
    tagSize() {
      return this.size || (this.$MlElement || {}).size;
    },
  },
  render() {
    const { type, tagSize, hit, effect } = this;
    const classes = [
      "ml-tag",
      type ? `ml-tag--${type}` : "",
      tagSize ? `ml-tag--${tagSize}` : "",
      effect ? `ml-tag--${effect}` : "",
      hit && "is-hit",
    ];
    const tagEl = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.handleClick}
      >
        {this.$slots.default}
        {this.closable && (
          <i
            class="ml-tag__close ml-icon-close"
            on-click={this.handleClose}
          ></i>
        )}
      </span>
    );

    return this.disableTransitions ? (
      tagEl
    ) : (
      <transition name="ml-zoom-in-center">{tagEl}</transition>
    );
  },
};
</script>
