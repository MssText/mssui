import Vue from "vue";
import Main from "./main.vue";
import { PopupManager } from "@/utils/popup";
let MessageConstructor = Vue.extend(Main);

let instance; // 当前的message实例
let instances = []; // 保存所有未关闭的message实例
let seed = 1;

const Message = function (options) {
  options = options || {};
  // 支持this.$message("这是一条提示")
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  let userOnClose = options.onClose;
  let id = "message_" + seed++;

  // message关闭时的回调函数
  options.onClose = function () {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options,
  });

  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });

  // 给当前message实例的data属性赋值
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex();

  instances.push(instance);
  return instance;
};

["success", "warning", "info", "error"].forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === "string") {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Message(options);
  };
});

// close函数主要做两件事：
// 1.从instances删除关闭的message实例
// 2.instances中剩下的message实例向上移动 （自身的高度 + 16）的距离

Message.close = function (id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === "function") {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  // 每一个message实例关闭时，后面的message需要向上移动（removedHeight - 16）的距离
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style["top"] =
      parseInt(dom.style["top"], 10) - removedHeight - 16 + "px";
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
