const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const resolvePath = filepath => {
  return path.join(__dirname, filepath);
};

module.exports = {
  mode: "production",
  entry: resolvePath("./index.js"),
  output: {
    path: resolvePath("./dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("tailwindcss")(resolvePath("./tailwind.config.js")),
                require("autoprefixer"),
                require("@fullhuman/postcss-purgecss")({
                  content: ["./**/*.html", "./**/*.vue"],
                  defaultExtractor: content =>
                    content.match(/[\w-/.:]+(?<!:)/g) || []
                })
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: resolvePath("./dist"),
    port: 9001
  },
  devtool: "inline-source-map",
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: resolvePath("index.html") })
  ]
};
