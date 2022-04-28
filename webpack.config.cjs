const path = require("path");

module.exports = {
  entry: {
    index: "./src/components/index.js",
    cart: "./src/components/cart.js",
    contact: "./src/components/contact.js",
    faq: "./src/components/faq.js",
    invoice: "./src/components/invoice.js",
    ourHistory: "./src/components/our_history.js",
    payment: "./src/components/payment.js",
    product_list: "./src/components/product_list.js",
    product_detail: "./src/components/product_detail.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        // \. is needed to have . - [] is placeholder, $ is end of filename, i means not case sensitive
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
      {
        // (|) is a selection, little like placeholder but only for specefic words, seperated by |
        test: /\.(png|jpg|svg|gif|jpeg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
};
