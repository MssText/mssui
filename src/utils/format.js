import { hasOwn, isUnDef, isPlainObject } from "./index";
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

export function format(string, ...args) {
  if (args.length === 1 && isPlainObject(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  if (isUnDef(string)) {
    return "";
  }
  // match => 匹配到的字符串 p1 => 第一个捕获组 p2 => 第二个捕获组 index => 匹配到的字符串在原字符串中的索引值
  return string.replace(RE_NARGS, (match, p1, p2, index) => {
    let result;
    if (string[index - 1] === "{" && string[index + match.length] === "}") {
      result = p2;
    } else {
      result = hasOwn(args, p2) ? args[p2] : null;
      if (isUnDef(result)) {
        return "";
      }
    }
    return result;
  });
}
