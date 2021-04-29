"use strict";
const path = require("path");
const fs = require("fs");
const fileSave = require("file-save");
const uppercamelcase = require("uppercamelcase");
const chalk = require("chalk");

console.log(chalk.blue("开始创建组件......"));
process.on("exit", () => {
  console.log();
});

if (!process.argv[2]) {
  console.log(chalk.red("[组件名]必填 - Please enter new component name"));
  process.exit(1);
}

// 拿到命令行输入的 组件的英文名称 比如 city-list
const componentname = process.argv[2];

// 判断组件是否已经创建 注意 fs的 读取的路径是以项目根目录的
let isHaved = fs.readdirSync("./src/packages").indexOf(componentname) > -1;
if (isHaved) {
  console.log(chalk.redBright("该组件已经存在"));
  process.exit(1);
}

// 将组件名字转换成大写
const ComponentName = uppercamelcase(componentname);

// 新组件添加的路径
const PackagePath = path.resolve(
  __dirname,
  "../../src/packages",
  componentname
);

// 新组件的样式文件添加的路径
const ThemePath = path.resolve(__dirname, "../../src/theme");

// 需要添加的文件列表和文件内容
const Files = [
  {
    filename: "index.js",
    content: `import Ml${ComponentName} from "./main";

/* istanbul ignore next */
Ml${ComponentName}.install = function (Vue) {
  Vue.component(Ml${ComponentName}.name, Ml${ComponentName});
};

export default Ml${ComponentName};`,
  },
  {
    filename: "main.vue",
    content: `<template>
  <div class="ml-${componentname}"></div>
</template>

<script>
export default {
  name: "Ml${ComponentName}",
};
</script>`,
  },
];

// 新建新组建样式文件
const newComponentText = `
@import "mixins/mixins";
@import "common/var";

@include b(${componentname}) {}`;
fileSave(path.join(ThemePath, `${componentname}.scss`))
  .write(newComponentText, "utf8")
  .end("\n");

// 新组件的样式 添加到 index.scss
const sassPath = path.join(__dirname, "../../src/theme/index.scss");
const sassImportText = `${fs.readFileSync(sassPath)}
@import "./${componentname}.scss";`;
fileSave(sassPath).write(sassImportText, "utf8").end("\n");

// index.js添加新组件的map
const componensPath = path.join(__dirname, "../../src/components.js");

let componensText = `${fs.readFileSync(componensPath)}`;

const importIndex = componensText.indexOf("export") - 1;
const endIndex = componensText.indexOf("]");

const importString = `import Ml${ComponentName} from "./packages/${componentname}";`;

componensText =
  componensText.slice(0, importIndex) +
  importString +
  "\n" +
  componensText.slice(importIndex, endIndex) +
  `Ml${ComponentName}];`;

fileSave(componensPath).write(componensText, "utf8").end("\n");

// 遍历 Files 数组，创建列出的所有文件并写入文件内容
Files.forEach((file) => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, "utf8")
    .end("\n");
});

console.log(chalk.blue("DONE！😄😄😄"));
