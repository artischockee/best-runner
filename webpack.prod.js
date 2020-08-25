const path = require("path");
const { merge } = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "assets/js/[name].[contenthash].js",
    chunkFilename: "assets/js/[name].[contenthash].chunk.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash].css",
      chunkFilename: "assets/css/[id].[hash].chunk.css",
    }),
    new CopyWebpackPlugin({
      patterns: ["server"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions", "last ie version"],
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true, // gotta be 'true', otherwise 'resolve-url-loader' won't work properly
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // gotta be 'true', otherwise 'resolve-url-loader' won't work properly
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
});
