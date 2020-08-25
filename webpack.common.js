const path = require("path");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  plugins: [
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      templateParameters: {
        publicDir: process.env.PUBLIC_URL,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@emotion/babel-preset-css-prop",
            ],
            plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: path.join("assets", "images"),
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  mergePaths: false,
                  cleanupIDs: false,
                  prefixIds: false,
                },
              },
            },
          },
          {
            loader: "file-loader",
            options: {
              outputPath: path.join("assets", "images"),
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: "file-loader",
        options: {
          outputPath: path.join("assets", "fonts"),
        },
      },
    ],
  },
};
