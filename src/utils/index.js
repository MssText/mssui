// 某个值是否定义
export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isUnDef(v) {
  return v === undefined || v === null;
}
// 是否是对象
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// 对象是否拥有某个属性
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// 深拷贝
export function deepClone(val) {
  if (isPlainObject(val)) {
    const res = {};
    for (let key in val) {
      res[key] = deepClone(val[key]);
    }
    return res;
  } else if (Array.isArray(val)) {
    return val.slice();
  } else {
    return val;
  }
}

// 混入属性
export function extend(to, from) {
  for (let key in from) {
    to[key] = from[key];
  }
  return to;
}
