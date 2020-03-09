const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const resolvePath = filepath => {
  return path.join(__dirname, filepath);
};

/*
{
        extractor(content) {
          return content.match(/[\w-/.:]+(?<!:)/g) // Regex to support Tailwind & Tailwind UI classes naming
        },
        extensions: ['html', 'vue', 'js']
      }
*/

module.exports = {
  mode: "development",
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
                require("autoprefixer")
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
