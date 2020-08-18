const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    host: "0.0.0.0",
    port: 3000,
    index: "index.html",
    hot: true,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.svg$/i,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: "file-loader",
      },
      {
        test: /\.[tj]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
          },
        },
      },
    ],
  },
});
