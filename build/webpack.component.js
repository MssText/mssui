const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const Components = require("../src/components.json");

const webpackConfig = {
  mode: "production",
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(process.cwd(), "./src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: process.cwd(),
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};

module.exports = webpackConfig;
