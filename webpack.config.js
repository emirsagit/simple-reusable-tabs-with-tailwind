const path = require("path");
const webpack = require("webpack");
// webpack.config.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var inProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: ["./src/app.js", "./src/app.css"],
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // fallback to style-loader in development
          inProduction ? "style-loader" : MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: { url: false },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },

      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // ...
          postcss: [require("postcss-cssnext")()],
        },
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development",
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  resolve: { alias: { vue: "vue/dist/vue.esm.js" } },
};
