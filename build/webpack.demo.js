const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const webpackConfig = {
  mode: "development",
  entry: path.resolve(process.cwd(), "./src/main.js"),
  output: {
    path: path.resolve(process.cwd(), "./dist"),
    filename: "[name].[hash:7].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(process.cwd(), "./src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  devServer: {
    port: 4000,
    publicPath: "/",
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: process.cwd(),
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "./public/index.html"),
      filename: "index.html",
      favicon: path.resolve(process.cwd(), "./public/favicon.ico"),
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = webpackConfig;
