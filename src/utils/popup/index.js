import Vue from "vue";
import merge from "@/utils/merge";
import PopupManager from "@/utils/popup/popup-manager";
import { getStyle, addClass, removeClass, hasClass } from "../dom";

let idSeed = 1;

let scrollBarWidth;

export default {
  props: {
    visible: {
      type: Boolean,
      default: false, // 弹窗是否显示
    },
    openDelay: {}, // 打开弹窗需要的时间
    closeDelay: {}, // 关闭弹窗需要的时间
    zIndex: {},
    modal: {
      type: Boolean,
      default: false, // 是否需要遮罩层
    },
    modalFade: {
      type: Boolean,
      default: true, // 是否开启动画
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false, // 弹窗是否以body为父容器
    },
    lockScroll: {
      type: Boolean,
      default: true, // 是否禁止滚动
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false, // 按下esc键是否关闭弹窗
    },
    closeOnClickModal: {
      type: Boolean,
      default: false, // 点击是否关闭弹窗
    },
  },

  beforeMount() {
    this._popupId = "popup-" + idSeed++;
    PopupManager.register(this._popupId, this);
  },

  beforeDestroy() {
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);

    this.restoreBodyStyle();
  },

  data() {
    return {
      opened: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false,
    };
  },

  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    },
  },

  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
      }

      const props = merge({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      const dom = this.$el;

      const modal = props.modal;

      const zIndex = props.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }
        PopupManager.openModal(
          this._popupId,
          PopupManager.nextZIndex(),
          this.modalAppendToBody ? undefined : dom,
          props.modalClass,
          props.modalFade
        );
        if (props.lockScroll) {
          this.withoutHiddenClass = !hasClass(
            document.body,
            "ml-popup-parent--hidden"
          );
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.computedBodyPaddingRight = parseInt(
              getStyle(document.body, "paddingRight"),
              10
            );
          }
          let bodyHasOverflow =
            document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, "overflowY");
          if (
            scrollBarWidth > 0 &&
            (bodyHasOverflow || bodyOverflowY === "scroll") &&
            this.withoutHiddenClass
          ) {
            document.body.style.paddingRight =
              this.computedBodyPaddingRight + scrollBarWidth + "px";
          }
          addClass(document.body, "ml-popup-parent--hidden");
        }
      }

      if (getComputedStyle(dom).position === "static") {
        dom.style.position = "absolute";
      }

      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      this.doAfterOpen();
    },

    doAfterOpen() {
      this._opening = false;
    },

    close() {
      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }

      this.opened = false;

      this.doAfterClose();
    },

    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    },

    restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight;
        removeClass(document.body, "ml-popup-parent--hidden");
      }
      this.withoutHiddenClass = true;
    },
  },
};

export { PopupManager };
